<template>
  <el-input
    v-model="input"
    placeholder="Please input password"
    show-password
  />
</template>

<script>
export default {
  data() {
    return {
      input: ''
    };
  }
};
</script>
