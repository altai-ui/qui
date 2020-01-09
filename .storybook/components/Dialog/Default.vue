<template>
  <div class="demo">
    <el-button
      type="text"
      @click="dialogVisible = true"
    >click to open the Dialog</el-button>

    <el-dialog
      title="Tips"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>This is a message</span>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button
          type="primary"
          @click="dialogVisible = false"
        >Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false
    }
  },
  methods: {
    handleClose(done) {
      this.$confirm('Are you sure to close this dialog?')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  }
}
</script>
