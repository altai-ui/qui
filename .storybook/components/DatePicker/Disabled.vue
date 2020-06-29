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
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: 'Today',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          },
          {
            text: 'Yesterday',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          },
          {
            text: 'A week ago',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
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
