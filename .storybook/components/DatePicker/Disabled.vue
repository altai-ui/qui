<template>
  <div class="demo">
    <div class="block">
      <span class="demonstration">Default</span>
      <el-date-picker
        v-model="value1"
        type="date"
        placeholder="Pick a day"
        format="dd MMM yyyy"
        disabled
      />
    </div>

    <div class="block">
      <span class="demonstration">Default</span>
      <el-date-picker
        v-model="value2"
        type="daterange"
        start-placeholder="Start date"
        end-placeholder="End date"
        format="dd MMM yyyy"
        disabled
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: '',
      value2: [new Date(), new Date()]
    };
  }
};
</script>
