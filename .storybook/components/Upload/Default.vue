<template>
  <el-upload
    class="upload-demo"
    action="https://jsonplaceholder.typicode.com/posts/"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :before-remove="beforeRemove"
    multiple
    :limit="3"
    :on-exceed="handleExceed"
  >
    <el-button
      size="small"
      type="primary"
    >Click to upload</el-button>
    <div
      slot="tip"
      class="el-upload__tip"
    >
      jpg/png files with a size less than 500kb
    </div>
  </el-upload>
</template>
<script>
export default {
  methods: {
    handleExceed(files, fileList) {
      this.$message.warning(
        `The limit is 3, you selected ${
          files.length
        } files this time, add up to ${files.length + fileList.length} totally`
      );
    },
    beforeRemove(file) {
      return this.$confirm(`Cancel the transfert of ${file.name} ?`);
    }
  }
};
</script>
