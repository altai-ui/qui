<template>
  <div class="demo">
    <div class="block">
      <span class="demonstration">Default</span>
      <el-date-picker
        v-model="value1"
        type="datetime"
        placeholder="Select date and time"
      >
      </el-date-picker>
    </div>
    <div class="block">
      <span class="demonstration">With shortcuts</span>
      <el-date-picker
        v-model="value2"
        type="datetime"
        placeholder="Select date and time"
        :picker-options="pickerOptions"
      >
      </el-date-picker>
    </div>
    <div class="block">
      <span class="demonstration">With default time</span>
      <el-date-picker
        v-model="value3"
        type="datetime"
        placeholder="Select date and time"
        default-time="12:00:00"
      >
      </el-date-picker>
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
            text: 'Today',
            onClick(picker) {
              picker.$emit('pick', new Date())
            }
          },
          {
            text: 'Yesterday',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          },
          {
            text: 'A week ago',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }
        ]
      },
      value1: '',
      value2: '',
      value3: ''
    }
  }
}
</script>
