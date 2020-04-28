<template>
  <el-input
    v-model="textarea"
    type="textarea"
    :rows="2"
    placeholder="Please input"
  />
</template>

<script>
export default {
  data() {
    return {
      textarea: ''
    };
  }
};
</script>
