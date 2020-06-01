<template>
  <div class="demo">
    <div class="block">
      <span class="demonstration">Default</span>
      <el-date-picker
        v-model="value1"
        type="monthrange"
        range-separator="To"
        start-placeholder="Start month"
        end-placeholder="End month"
        format="dd MMM yyyy"
      />
    </div>
    <div class="block">
      <span class="demonstration">With quick options</span>
      <el-date-picker
        v-model="value2"
        type="monthrange"
        align="right"
        unlink-panels
        range-separator="To"
        start-placeholder="Start month"
        end-placeholder="End month"
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
            text: 'This month',
            onClick(picker) {
              picker.$emit('pick', [new Date(), new Date()]);
            }
          },
          {
            text: 'This year',
            onClick(picker) {
              const end = new Date();
              const start = new Date(new Date().getFullYear(), 0);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: 'Last 6 months',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setMonth(start.getMonth() - 6);
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
