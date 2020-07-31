<template>
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
</template>

<script>
const cityOptions = ['Вариант A', 'Вариант B', 'Option C', 'Option D'];
export default {
  data() {
    return {
      checkAll: false,
      checkedCities: ['Вариант A', 'Option C'],
      cities: cityOptions,
      isIndeterminate: true
    };
  },
  methods: {
    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      const checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    }
  }
};
</script>
