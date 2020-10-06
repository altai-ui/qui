import { QCheckbox, QCheckboxGroup } from '../../src/qComponents';
import '../../src/qComponents/QCheckbox/src/q-checkbox.scss';
import '../../src/qComponents/QCheckbox/src/q-checkbox-group.scss';

export default {
  title: 'Components/QCheckbox/QCheckboxGroup',
  component: QCheckboxGroup,
  subcomponents: { QCheckbox },
  argTypes: {
    value: { control: { type: 'none' } },
    direction: {
      control: { type: 'inline-radio', options: ['vertical', 'horizontal'] }
    }
  }
};

export const QCheckboxGroupStory = (_, { argTypes }) => ({
  components: { QCheckbox, QCheckboxGroup },
  props: Object.keys(argTypes),
  data() {
    return {
      checkedCities: ['Shanghai', 'Beijing'],
      cities: ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen']
    };
  },
  template: `
    <q-checkbox-group
      v-model="checkedCities"
      v-bind="$props"
    >
      <q-checkbox
        v-for="city in cities"
        :key="city"
        :label="city"
      >{{
        city
      }}</q-checkbox>
    </q-checkbox-group>
  `
});

QCheckboxGroupStory.storyName = 'Default';
QCheckboxGroupStory.args = {
  min: 1,
  max: 2
};

export const QCheckboxGroupStoryIndeterminate = () => ({
  components: { QCheckbox, QCheckboxGroup },
  data() {
    return {
      checkAll: false,
      checkedCities: ['Вариант A', 'Option C'],
      cities: ['Вариант A', 'Вариант B', 'Option C', 'Option D'],
      isIndeterminate: true
    };
  },
  methods: {
    handleCheckAllChange(val) {
      this.checkedCities = val ? this.cities : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      const checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    }
  },
  template: `
    <div>
      <q-checkbox
        v-model="checkAll"
        :indeterminate="isIndeterminate"
        style="margin-bottom: 16px"
        @change="handleCheckAllChange"
      >
        Выбрать все
      </q-checkbox>

      <q-checkbox-group
        v-model="checkedCities"
        direction="horizontal"
        @change="handleCheckedCitiesChange"
      >
        <q-checkbox
          v-for="city in cities"
          :key="city"
          :label="city"
        >
          {{ city }}
        </q-checkbox>
      </q-checkbox-group>
    </div>
  `
});

QCheckboxGroupStoryIndeterminate.storyName = 'Indeterminate';
