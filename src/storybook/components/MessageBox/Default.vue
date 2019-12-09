<template>
  <div class="demo">
    <el-button type="text" @click="open"
      >Click to open the Message Box</el-button
    >
  </div>
</template>

<script>
export default {
  methods: {
    open() {
      this.$alert('This is a message', 'Title', {
        confirmButtonText: 'OK',
        callback: action => {
          this.$message({
            type: 'info',
            message: `action: ${action}`
          })
        }
      })
    }
  }
}
</script>
