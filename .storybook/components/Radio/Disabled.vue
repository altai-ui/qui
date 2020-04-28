<template>
  <div>
    <el-radio
      v-model="radio"
      disabled
      label="disabled"
    >Option A</el-radio>
    <el-radio
      v-model="radio"
      disabled
      label="selected and disabled"
    >Option B</el-radio>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio: 'selected and disabled'
    };
  }
};
</script>
