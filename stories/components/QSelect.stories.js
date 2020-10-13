import { QSelect, QOption } from '../../src/qComponents';

export default {
  title: 'Components/QSelect',
  component: QSelect,
  subcomponents: { QOption },
  argTypes: {
    value: { control: { type: 'none' } }
  }
};

export const QSelectStory = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  data() {
    return {
      value: null,
      options: [
        {
          value: 'var 1',
          label: 'Вариант 1'
        },
        {
          value: 'var 2',
          label: 'Вариант 2'
        },
        {
          value: 'Очень длинный пример варианта 3',
          label: 'Очень длинный пример варианта 3'
        },
        {
          value: 'var 3',
          label: 'Вариант 4',
          disabled: true
        },
        {
          value: 'var 5',
          label: 'Очень длинный пример варианта 5',
          disabled: true
        },
        {
          value: 'Option 6',
          label: 'Option 6'
        }
      ]
    };
  },
  template: `
    <q-select
      v-model="value"
      v-bind="$props"
    >
      <q-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
        :disabled="item.disabled"
      />
    </q-select>
  `
});

QSelectStory.storyName = 'Default';
QSelectStory.args = {
  appendToBody: false,
  placeholder: 'Выберите вариант'
};

export const QSelectRemoteSearchStory = () => ({
  data() {
    return {
      options: [],
      value: [],
      list: [],
      loading: false,
      states: [
        'Alabama',
        'Alaska',
        'Arizona',
        'Arkansas',
        'California',
        'Colorado',
        'Connecticut',
        'Delaware',
        'Florida',
        'Georgia',
        'Hawaii',
        'Idaho',
        'Illinois',
        'Indiana',
        'Iowa',
        'Kansas',
        'Kentucky',
        'Louisiana',
        'Maine',
        'Maryland',
        'Massachusetts',
        'Michigan',
        'Minnesota',
        'Mississippi',
        'Missouri',
        'Montana',
        'Nebraska',
        'Nevada',
        'New Hampshire',
        'New Jersey',
        'New Mexico',
        'New York',
        'North Carolina',
        'North Dakota',
        'Ohio',
        'Oklahoma',
        'Oregon',
        'Pennsylvania',
        'Rhode Island',
        'South Carolina',
        'South Dakota',
        'Tennessee',
        'Texas',
        'Utah',
        'Vermont',
        'Virginia',
        'Washington',
        'West Virginia',
        'Wisconsin',
        'Wyoming'
      ]
    };
  },
  mounted() {
    this.list = this.states.map(item => {
      return { value: `value:${item}`, label: `label:${item}` };
    });
  },
  methods: {
    handleSearch(query) {
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options = this.list.filter(item => {
            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
          });
        }, 2000);
      } else {
        this.options = [];
      }
    }
  },
  template: `
    <q-select
      v-model="value"
      multiple
      filterable
      remote
      reserve-keyword
      clearable
      placeholder="Введите ключевое слово"
      :loading="loading"
      @remote-method="handleSearch"
    >
      <q-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </q-select>
  `
});

QSelectRemoteSearchStory.storyName = 'RemoteSearch';
