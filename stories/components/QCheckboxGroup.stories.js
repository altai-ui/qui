import QCheckboxGroup from '../../src/qComponents/QCheckboxGroup';
import QCheckbox from '../../src/qComponents/QCheckbox';

const args = {
  min: 0,
  max: 3
};

export default {
  title: 'Components/QCheckbox/QCheckboxGroup',
  component: QCheckboxGroup,
  subcomponents: { QCheckbox },
  argTypes: {
    value: { control: { type: 'none' } },
    min: { control: { type: 'none' } },
    max: { control: { type: 'none' } },
    direction: {
      control: { type: 'inline-radio', options: ['vertical', 'horizontal'] }
    }
  }
};

export const Default = (_, { argTypes }) => ({
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

Default.args = args;

export const Indeterminate = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { QCheckbox, QCheckboxGroup },
  data() {
    return {
      checkAll: false,
      checkedCities: ['Option A', 'Option C'],
      cities: ['Option A', 'Option B', 'Option C', 'Option D'],
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
        :disabled="disabled"
      >
        Check all
      </q-checkbox>

      <q-checkbox-group
        v-model="checkedCities"
        @change="handleCheckedCitiesChange"
        v-bind="$props"
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

Indeterminate.args = args;
