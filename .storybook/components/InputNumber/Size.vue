<template>
  <div class="demo">
    <el-row>
      <el-input-number v-model="num1" />
    </el-row>
    <el-row>
      <el-input-number
        v-model="num2"
        size="medium"
      />
    </el-row>
    <el-row>
      <el-input-number
        v-model="num3"
        size="small"
      />
    </el-row>
    <el-row>
      <el-input-number
        v-model="num4"
        size="mini"
      />
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
    };
  }
};
</script>
