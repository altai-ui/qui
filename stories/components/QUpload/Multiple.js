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

      const currentFile = this.formModel.files.find(
        file => file.fileId === fileId
      );

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
    }
  },
  template: `
    <q-upload
      v-bind="$props"
      multiple
      :value="formModel.files"
      @select="handleFileSelect"
    />
  `
});

QUploadStoryMultiple.storyName = 'Multiple';
QUploadStoryMultiple.args = {
  accept: ['image/*', '.pdf']
};

export default QUploadStoryMultiple;
