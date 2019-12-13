<template>
  <div class="demo">
    <el-row>
      <el-input-number v-model="num1"></el-input-number>
    </el-row>
    <el-row>
      <el-input-number size="medium" v-model="num2"></el-input-number>
    </el-row>
    <el-row>
      <el-input-number size="small" v-model="num3"></el-input-number>
    </el-row>
    <el-row>
      <el-input-number size="mini" v-model="num4"></el-input-number>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      num1: 1,
      num2: 1,
      num3: 1,
      num4: 1
    }
  }
}
</script>
