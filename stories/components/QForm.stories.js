import { QForm, QFormItem, QInput, QTextarea } from '../../src/qComponents';
import '../../src/qComponents/QForm/src/q-form-item.scss';

export default {
  title: 'Components/QForm',
  component: QForm,
  subcomponents: { QFormItem },
  argTypes: {
    rules: { control: { type: 'object' } },
    model: { control: { type: 'none' } }
  }
};

export const QFormStory = (_, { argTypes }) => ({
  components: { QForm, QFormItem, QInput, QTextarea },
  props: Object.keys(argTypes).filter(arg => arg !== 'model'),
  data() {
    return {
      formModel: {
        name: '',
        intro: ''
      }
    };
  },
  methods: {
    async handleSubmitClick() {
      const { isValid, invalidFields } = await this.$refs.form.validate();
      console.log('QForm | validate', isValid, invalidFields);
    },

    handleResetClick() {
      this.$refs.form.resetFields();
    }
  },
  template: `
    <q-form
      ref="form"
      :model="formModel"
      :rules="rules"
      :disabled="disabled"
      :hideRequiredAsterisk="hideRequiredAsterisk"
      :showErrorMessage="showErrorMessage"
      :validateOnRuleChange="validateOnRuleChange"
    >
      <q-form-item
        label="Name"
        prop="name"
      >
        <q-input
          v-model="formModel.name"
          type="text"
        />
      </q-form-item>
      <q-form-item
        label="Introtext"
        prop="intro"
      >
        <q-textarea
          v-model="formModel.intro"
        />
      </q-form-item>

      <q-button @click="handleSubmitClick">Create</q-button>
      <q-button @click="handleResetClick">Reset</q-button>
    </q-form>
  `
});

QFormStory.storyName = 'Default';
QFormStory.args = {
  rules: {
    name: [
      {
        required: true,
        message: 'Please input name',
        trigger: 'blur'
      },
      {
        min: 3,
        max: 5,
        message: 'Length should be 3 to 10',
        trigger: 'blur'
      }
    ],
    intro: {
      required: true,
      message: 'Please input introtext',
      trigger: 'change'
    }
  }
};