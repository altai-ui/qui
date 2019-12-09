<template>
  <div class="demo">
    <el-switch v-model="value1" disabled> </el-switch>
    <el-switch v-model="value2" disabled> </el-switch>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: true,
      value2: false
    }
  }
}
</script>
