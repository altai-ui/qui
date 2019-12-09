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
      this.$confirm(
        'This will permanently delete the file. Continue?',
        'Warning',
        {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }
      )
        .then(() => {
          this.$message({
            type: 'success',
            message: 'Delete completed'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: 'Delete canceled'
          })
        })
    }
  }
}
</script>
