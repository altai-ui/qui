<template>
  <el-input-number
    v-model="num"
    controls-position="right"
    @change="handleChange"
    :min="1"
    :max="10"
  ></el-input-number>
</template>
<script>
export default {
  data() {
    return {
      num: 1
    }
  },
  methods: {
    handleChange(value) {
      console.log(value)
    }
  }
}
</script>
