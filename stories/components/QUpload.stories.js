import { uniqueId } from 'lodash-es';
import QUpload from '../../src/qComponents/QUpload';

export default {
  title: 'Components/QUpload',

  component: QUpload,

  argTypes: {
    'v-model': { control: { type: 'none' } }
  }
};

export const QUploadStory = (_, { argTypes }) => ({
  props: Object.keys(argTypes),

  data() {
    return {
      formModel: {
        files: [
          // {
          //   id: 1,
          //   name: 'test1.jpg',
          //   percentage: 0,
          //   status: 'success',
          //   error: null,
          // },
          // {
          //   id: 2,
          //   name: 'test2.jpg',
          //   percentage: 0,
          //   status: 'success',
          //   error: null,
          // },
          // {
          //   id: 3,
          //   name: 'test3.jpg',
          //   percentage: 0,
          //   status: 'success',
          //   error: null,
          // },
          // {
          //   id: 4,
          //   name: 'test4.jpg',
          //   percentage: 0,
          //   status: 'success',
          //   error: null,
          // },
          // {
          //   id: 5,
          //   name: 'test5.jpg',
          //   percentage: 0,
          //   status: 'success',
          //   error: null,
          // },
          // {
          //   id: 6,
          //   name: 'test6.jpg',
          //   percentage: 0,
          //   status: 'success',
          //   error: null,
          // },
        ]
      }
    };
  },

  methods: {
    async handleFileSelect(sourceFiles) {
      sourceFiles.forEach(file => {
        const id = uniqueId('file-');

        if (!this.formModel.files) {
          this.formModel.files = [];
        }

        this.formModel.files.push({
          id,
          name: file.name,
          size: file.size,
          type: file.type,
          status: 'progress',
          percentage: 0,
          error: null
        });

        const foundFile = this.formModel.files.find(item => item.id === id);

        const promise = new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsArrayBuffer(file);

          reader.addEventListener('progress', ({ loaded, total }) => {
            if (foundFile) {
              foundFile.percentage = Math.ceil((loaded * 100) / total);
            }
          });

          reader.addEventListener('load', () => {
            resolve(foundFile);
          });

          reader.addEventListener('error', () => {
            reject(foundFile);
          });
        });

        promise
          .then(() => {
            if (foundFile) {
              foundFile.status = 'success';
            }
          })
          .catch(() => {
            if (foundFile) {
              foundFile.status = 'error';
              foundFile.percentage = 0;
              foundFile.error = 'Ошибка при загрузке файла';
            }
          });
      });

      return this.formModel.files;
    },

    handleRemove(fileId) {
      this.formModel.files = this.formModel.files.filter(
        ({ id }) => id !== fileId
      );
    }
  },

  template: `
    <q-upload
      v-model="formModel.files"
      v-bind="$props"
      :on-select-files="handleFileSelect"
      @remove="handleRemove"
    />
  `
});

QUploadStory.storyName = 'Default';
QUploadStory.args = {
  accept: [],
  multiple: true,
  disabled: false,
  filesPosition: 'right'
};
