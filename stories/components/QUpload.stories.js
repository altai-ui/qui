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
        files: null
      }
    };
  },

  methods: {
    async handleFileSelect(sourceFile) {
      const promise = () =>
        new Promise(resolve => {
          setTimeout(
            () =>
              resolve({
                ...sourceFile,
                loading: false,
                percentage: 100
              }),
            1000
          );
        });

      try {
        return await promise();
      } catch {
        return null;
      }
    },

    handleAbort(fileId) {
      console.log('fileId', fileId);
    },

    handleDelete(fileId) {
      this.formModel.files = this.formModel.files.filter(
        ({ id }) => id !== fileId
      );
    },

    handleUploadBtnClick() {
      this.formModel.files = this.formModel.files.map(file => ({
        ...file,
        loading: true
      }));

      const promises = [];

      this.formModel.files.forEach(file => {
        promises.push(this.handleFileSelect(file));
      });

      Promise.all(promises).then(response => {
        this.formModel.files = response;
      });
    }
  },

  template: `
    <div>
      <q-upload
        v-model="formModel.files"
        v-bind="$props"
        :on-select-file="handleFileSelect"
        @abort="handleAbort"
        @remove="handleDelete"
      />

      <div style="margin-top: 24px; display: flex; justify-content: center;">
        <q-button
          style="margin-right: 24px;"
          @click="handleUploadBtnClick"
        >Загрузить</q-button>
      </div>
    </div>
  `
});

QUploadStory.storyName = 'Default';
QUploadStory.args = {
  accept: [],
  multiple: true
};
