<template>
  <div>
    <el-checkbox
      v-model="checkAll"
      :indeterminate="isIndeterminate"
      style="margin-bottom: 16px"
      @change="handleCheckAllChange"
    >Выбрать все</el-checkbox>
    <el-checkbox-group
      v-model="checkedCities"
      @change="handleCheckedCitiesChange"
    >
      <el-checkbox
        v-for="city in cities"
        :key="city"
        :label="city"
      >
        {{ city }}
      </el-checkbox>
    </el-checkbox-group>
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
