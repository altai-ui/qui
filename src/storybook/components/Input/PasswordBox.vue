<template>
  <el-input
    placeholder="Please input password"
    v-model="input"
    show-password
  ></el-input>
</template>

<script>
export default {
  data() {
    return {
      input: ''
    }
  }
}
</script>
