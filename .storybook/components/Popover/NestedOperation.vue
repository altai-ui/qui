<template>
  <div class="demo">
    <el-popover
      v-model="visible"
      placement="top"
      width="160"
    >
      <p>Are you sure to delete this?</p>
      <div style=" margin: 0;text-align: right">
        <el-button
          size="mini"
          type="text"
          @click="visible = false"
        >cancel</el-button>
        <el-button
          type="primary"
          size="mini"
          @click="visible = false"
        >confirm</el-button>
      </div>
      <el-button slot="reference">Delete</el-button>
    </el-popover>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false
    };
  }
};
</script>
