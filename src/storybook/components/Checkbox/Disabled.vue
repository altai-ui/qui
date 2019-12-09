<template>
  <div>
    <el-checkbox v-model="checked1" disabled>Option</el-checkbox>
    <el-checkbox v-model="checked2" disabled>Option</el-checkbox>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked1: false,
      checked2: true
    }
  }
}
</script>
