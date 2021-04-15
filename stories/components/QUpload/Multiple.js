const QUploadStoryMultiple = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  data() {
    return {
      formModel: {
        files: []
      }
    };
  },
  methods: {
    async handleFileSelect(sourceFile, fileId) {
      this.formModel.files.push({
        id: fileId,
        sourceFile,
        name: sourceFile.name,
        loading: 0
      });

      const currentFile = this.formModel.files.find(({ id }) => id === fileId);

      const promise = () =>
        new Promise(resolve => {
          const interval = setInterval(() => {
            currentFile.loading += 10;
          }, 100);

          setTimeout(() => {
            clearInterval(interval);
            currentFile.loading = null;
            resolve();
          }, 1000);
        });

      await promise();
    },

    handleAbort(fileId) {
      console.log('abort uploading for: ', fileId);
    },

    handleClear(fileId) {
      this.formModel.files = this.formModel.files.filter(
        ({ id }) => id !== fileId
      );
    },

    handleClearAll() {
      this.formModel.files = [];
    }
  },
  template: `
    <q-upload
      v-bind="$props"
      multiple
      :value="formModel.files"
      @select="handleFileSelect"
      @abort="handleAbort"
      @clear="handleClear"
      @clear-all="handleClearAll"
    />
  `
});

QUploadStoryMultiple.storyName = 'Multiple';
QUploadStoryMultiple.args = {
  accept: ['image/*', '.pdf']
};

export default QUploadStoryMultiple;
