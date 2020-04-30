<template>
  <div>
    <el-radio
      v-model="radio"
      label="1"
    >Option A</el-radio>
    <el-radio
      v-model="radio"
      label="2"
    >Option B</el-radio>
    <el-radio
      v-model="radio"
      label="3"
      disabled
    >Option C (disabled)</el-radio>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio: '1'
    };
  }
};
</script>
