const QUploadStoryMultiple = (_, { argTypes }) => ({
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
      const promise = () =>
        new Promise(resolve => {
          setTimeout(() => resolve(sourceFile), 1000);
        });

      try {
        return await promise();
      } catch {
        return null;
      }
    }
  },
  template: `
    <q-upload
      v-model="formModel.file"
      v-bind="$props"
      :on-select-file="handleFileSelect"
    />
  `
});

QUploadStoryMultiple.storyName = 'Default';
QUploadStoryMultiple.args = {
  accept: ['image/*', '.pdf']
};

export default QUploadStoryMultiple.bind({});
