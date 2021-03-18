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
    handleFileSelect(sourceFiles) {
      sourceFiles.forEach(sourceFile => {
        const id = uniqueId('file-');

        if (!this.formModel.files) {
          this.formModel.files = [];
        }

        this.formModel.files.push({
          id,
          name: sourceFile.name,
          size: sourceFile.size,
          type: sourceFile.type,
          status: 'progress',
          percentage: 0,
          error: null
        });

        const reader = new FileReader();
        reader.readAsArrayBuffer(sourceFile);

        const foundFile = this.formModel.files.find(
          currentFile => currentFile.id === id
        );

        reader.addEventListener('progress', ({ loaded, total }) => {
          if (foundFile) {
            foundFile.percentage = Math.ceil((loaded * 100) / total);
          }
        });

        reader.addEventListener('load', () => {
          if (foundFile) {
            foundFile.status = 'success';
          }
        });

        reader.addEventListener('error', () => {
          if (foundFile) {
            foundFile.status = 'error';
            foundFile.percentage = 0;
            foundFile.error = 'Ошибка при загрузке файла'; // пример текста ошибки
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
