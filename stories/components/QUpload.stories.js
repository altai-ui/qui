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
  watch: {
    formModel: {
      deep: true,
      handler(value) {
        console.log('value', value);
      }
    }
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
    },

    handleShowFiles(fileList) {
      console.log(fileList);
    }
  },
  template: `
    <q-upload
      v-model="formModel.files"
      v-bind="$props"
      :on-select-file="handleFileSelect"
      @show-files="handleShowFiles"
    />
  `
});

QUploadStory.storyName = 'Default';
QUploadStory.args = {
  accept: ['image/*', '.pdf'],
  multiple: true
};
