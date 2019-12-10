<template>
  <div class="demo">
    <el-row>
      <el-color-picker v-model="color"></el-color-picker>
    </el-row>
    <el-row>
      <el-color-picker v-model="color" size="medium"></el-color-picker>
    </el-row>
    <el-row>
      <el-color-picker v-model="color" size="small"></el-color-picker>
    </el-row>
    <el-row>
      <el-color-picker v-model="color" size="mini"></el-color-picker>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      color: '#409EFF'
    }
  }
}
</script>
