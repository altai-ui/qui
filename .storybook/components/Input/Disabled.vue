<template>
  <el-input
    v-model="input"
    placeholder="Please input"
    :disabled="true"
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
