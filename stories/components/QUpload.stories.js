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

QUploadStory.storyName = 'Default';
QUploadStory.args = {
  accept: ['image/*', '.pdf']
};
