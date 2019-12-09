<template>
  <el-input
    type="textarea"
    :rows="2"
    placeholder="Please input"
    v-model="textarea"
  >
  </el-input>
</template>

<script>
export default {
  data() {
    return {
      textarea: ''
    }
  }
}
</script>
