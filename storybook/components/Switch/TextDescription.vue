<template>
  <div class="demo">
    <el-switch
      v-model="value1"
      active-text="Pay by month"
      inactive-text="Pay by year"
    >
    </el-switch>
    <el-switch
      style="display: block"
      v-model="value2"
      active-color="#13ce66"
      inactive-color="#ff4949"
      active-text="Pay by month"
      inactive-text="Pay by year"
    >
    </el-switch>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: true,
      value2: true
    }
  }
}
</script>
