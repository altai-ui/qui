<template>
  <div>
    <el-radio disabled v-model="radio" label="disabled">Option A</el-radio>
    <el-radio disabled v-model="radio" label="selected and disabled"
      >Option B</el-radio
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio: 'selected and disabled'
    }
  }
}
</script>
