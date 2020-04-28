<template>
  <el-input-number
    v-model="num"
    :disabled="true"
  />
</template>
<script>
export default {
  data() {
    return {
      num: 1
    };
  }
};
</script>
