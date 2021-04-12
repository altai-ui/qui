const QUploadStory = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  data() {
    return {
      formModel: {
        file: null
      }
    };
  },
  methods: {
    async handleFileSelect(sourceFile) {
      this.formModel.file = {
        sourceFile,
        name: sourceFile.name,
        loading: 0
      };

      const promise = () =>
        new Promise(resolve => {
          const interval = setInterval(() => {
            this.formModel.file.loading += 10;
          }, 100);

          setTimeout(() => {
            clearInterval(interval);
            this.formModel.file.loading = null;
            resolve();
          }, 1000);
        });

      await promise();
    },

    handleAbort() {
      console.log('abort uploading');
    },

    handleClear() {
      this.formModel.file = null;
    }
  },
  template: `
    <q-upload
      v-bind="$props"
      :value="formModel.file"
      @select="handleFileSelect"
      @abort="handleAbort"
      @clear="handleClear"
    />
  `
});

QUploadStory.storyName = 'Default';
QUploadStory.args = {
  accept: ['image/*', '.pdf']
};

export default QUploadStory;
