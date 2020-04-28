<template>
  <div>
    <el-radio-group v-model="radio">
      <el-radio :label="3">Option A</el-radio>
      <el-radio :label="6">Option B</el-radio>
      <el-radio :label="9">Option C</el-radio>
    </el-radio-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio: 3
    };
  }
};
</script>
