<template>
  <div class="demo">
    <div class="container">
      <div class="block">
        <span class="demonstration">Week</span>
        <el-date-picker
          v-model="value1"
          type="week"
          format="неделя WW"
          placeholder="Pick a week"
        />
      </div>
      <div class="block">
        <span class="demonstration">Month</span>
        <el-date-picker
          v-model="value2"
          type="month"
          placeholder="Pick a month"
          format="dd MMM yyyy"
        />
      </div>
    </div>
    <div class="container">
      <div class="block">
        <span class="demonstration">Year</span>
        <el-date-picker
          v-model="value3"
          type="year"
          placeholder="Pick a year"
          format="dd MMM yyyy"
        />
      </div>
      <div class="block">
        <span class="demonstration">Dates</span>
        <el-date-picker
          v-model="value4"
          type="dates"
          placeholder="Pick one or more dates"
          format="dd MMM yyyy"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: '',
      value2: '',
      value3: '',
      value4: ''
    };
  }
};
</script>
