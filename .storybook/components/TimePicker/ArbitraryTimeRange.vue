<template>
  <div class="demo">
    <el-row>
      <el-time-picker
        v-model="value1"
        is-range
        range-separator="To"
        start-placeholder="Start time"
        end-placeholder="End time"
      />
    </el-row>
    <el-row>
      <el-time-picker
        v-model="value2"
        is-range
        arrow-control
        range-separator="To"
        start-placeholder="Start time"
        end-placeholder="End time"
      />
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
      value2: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)]
    };
  }
};
</script>
