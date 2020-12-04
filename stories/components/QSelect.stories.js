import QSelect from '../../src/qComponents/QSelect';
import QOption from '../../src/qComponents/QOption';

export default {
  title: 'Components/QSelect',
  component: QSelect,
  subcomponents: { QOption },
  argTypes: {
    value: { control: { type: 'none' } }
  }
};

const options = [
  {
    value: { id: 'value1' },
    label: 'Вариант 1'
  },
  {
    value: { id: 'value2' },
    label: 'Вариант 2'
  },
  {
    value: { id: 'value3' },
    label: 'Очень очень длинный пример варианта 3'
  },
  {
    value: { id: 'value4' },
    label: 'Вариант 4',
    disabled: true
  },
  {
    value: { id: 'value5' },
    label: 'Очень длинный пример варианта 5',
    disabled: true
  },
  {
    value: { id: 'value6' },
    label: 'Option 6'
  }
];

export const QSelectStory = (_, { argTypes }) => ({
  props: Object.keys(argTypes).filter(arg => arg !== 'value'),

  data() {
    return {
      remoteLoading: false,
      value: null,
      options
    };
  },

  watch: {
    multiple() {
      this.value = null;
    },

    remote(value) {
      if (!value) this.options = options;
    }
  },

  methods: {
    handleSearch(query) {
      if (!this.remote) return;

      this.remoteLoading = true;

      setTimeout(() => {
        this.remoteLoading = false;

        if (query !== '') {
          this.options = options.filter(item => {
            return item.label.toLowerCase().includes(query.toLowerCase());
          });
        } else {
          this.options = options;
        }
      }, 2000);
    }
  },

  template: `
    <div style="width: 304px;">
      <q-select
        v-model="value"
        v-bind="$props"
        :loading="loading || remoteLoading"
        @search="handleSearch"
      >
        <q-option
          v-for="item in options"
          :key="item.value.id"
          :label="item.label"
          :value="item.value"
          :disabled="item.disabled"
        />
      </q-select>
    </div>
  `
});

QSelectStory.storyName = 'Default';
QSelectStory.args = {
  appendToBody: false,
  multiple: true,
  filterable: true,
  valueKey: 'id',
  allowCreate: false,
  collapseTags: false,
  clearable: true,
  placeholder: 'Выберите вариант'
};
