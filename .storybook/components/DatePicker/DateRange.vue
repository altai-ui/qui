<template>
  <div class="demo">
    <div class="block">
      <span class="demonstration">Default</span>
      <el-date-picker
        v-model="value1"
        type="daterange"
        start-placeholder="Start date"
        end-placeholder="End date"
        format="dd MMM yyyy"
      />
    </div>
    <div class="block">
      <span class="demonstration">With quick options</span>
      <el-date-picker
        v-model="value2"
        type="daterange"
        align="right"
        unlink-panels
        start-placeholder="Start date"
        end-placeholder="End date"
        :picker-options="pickerOptions"
        format="dd MMM yyyy"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: 'Last week',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: 'Last month',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: 'Last 3 months',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }
        ]
      },
      value1: '',
      value2: ''
    };
  }
};
</script>
