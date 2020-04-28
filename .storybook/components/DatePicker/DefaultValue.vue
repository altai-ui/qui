<template>
  <div>
    <div class="block">
      <span class="demonstration">Date</span>
      <el-date-picker
        v-model="value1"
        type="date"
        placeholder="Pick a date"
        default-value="2010-10-01"
      />
    </div>
    <div class="block">
      <span class="demonstration">Daterange</span>
      <el-date-picker
        v-model="value2"
        type="daterange"
        align="right"
        start-placeholder="Start Date"
        end-placeholder="End Date"
        default-value="2010-10-01"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: '',
      value2: ''
    };
  }
};
</script>
