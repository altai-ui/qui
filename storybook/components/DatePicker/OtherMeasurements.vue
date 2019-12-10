<template>
  <div class="demo">
    <div class="container">
      <div class="block">
        <span class="demonstration">Week</span>
        <el-date-picker
          v-model="value1"
          type="week"
          format="Week WW"
          placeholder="Pick a week"
        >
        </el-date-picker>
      </div>
      <div class="block">
        <span class="demonstration">Month</span>
        <el-date-picker
          v-model="value2"
          type="month"
          placeholder="Pick a month"
        >
        </el-date-picker>
      </div>
    </div>
    <div class="container">
      <div class="block">
        <span class="demonstration">Year</span>
        <el-date-picker v-model="value3" type="year" placeholder="Pick a year">
        </el-date-picker>
      </div>
      <div class="block">
        <span class="demonstration">Dates</span>
        <el-date-picker
          type="dates"
          v-model="value4"
          placeholder="Pick one or more dates"
        >
        </el-date-picker>
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
    }
  }
}
</script>
