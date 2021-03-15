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
        files: []
      }
    };
  },

  methods: {
    async handleFileSelect(sourceFiles) {
      console.log('sourceFiles', sourceFiles);

      sourceFiles.forEach(file => {
        const id = Date.now() + Math.random();

        this.formModel.files.push({
          id,
          name: file.name,
          size: file.size,
          type: file.type,
          status: 'progress',
          percentage: 0,
          error: null
        });

        const promise = new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);

          reader.addEventListener('progress', ({ loaded, total }) => {
            const foundFile = this.formModel.files.find(item => item.id === id);

            if (foundFile) {
              foundFile.percentage = Math.ceil((loaded * 100) / total);
            }
          });

          reader.addEventListener('load', () => {
            resolve(file);
          });

          reader.addEventListener('error', () => {
            reject(file);
          });
        });

        promise
          .then(() => {
            const foundFile = this.formModel.files.find(item => item.id === id);

            if (foundFile) {
              foundFile.status = 'success';
              foundFile.percentage = 50;
              foundFile.error = 'Ошибка при загрузке файла';
            }
          })
          .catch(() => {
            const foundFile = this.formModel.files.find(item => item.id === id);

            if (foundFile) {
              foundFile.status = 'error';
              foundFile.percentage = 0;
              foundFile.error = 'Ошибка при загрузке файла';
            }
          });
      });

      const promise = () =>
        new Promise(resolve => {
          setTimeout(() => resolve(this.formModel.files), 1000);
        });

      try {
        return await promise();
      } catch {
        return null;
      }
    },

    handleRemove(fileId) {
      this.formModel.files = this.formModel.files.filter(
        ({ id }) => id !== fileId
      );
      console.log('this.formModel.files', this.formModel.files);
    }
  },

  template: `
    <q-upload
      v-model="formModel.files"
      v-bind="$props"
      :on-select-files="handleFileSelect"
      @cancel="handleRemove"
      @remove="handleRemove"
    />
  `
});

QUploadStory.storyName = 'Default';
QUploadStory.args = {
  accept: [],
  multiple: true,
  filesPosition: 'right'
};
