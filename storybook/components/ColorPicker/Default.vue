<template>
  <div class="demo">
    <div class="block">
      <span class="demonstration">With default value</span>
      <el-color-picker v-model="color1"></el-color-picker>
    </div>
    <div class="block">
      <span class="demonstration">With no default value</span>
      <el-color-picker v-model="color2"></el-color-picker>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      color1: '#409EFF',
      color2: null
    }
  }
}
</script>
