<template>
  <div class="demo">
    <el-popover placement="top" width="160" v-model="visible">
      <p>Are you sure to delete this?</p>
      <div style="text-align: right; margin: 0">
        <el-button size="mini" type="text" @click="visible = false"
          >cancel</el-button
        >
        <el-button type="primary" size="mini" @click="visible = false"
          >confirm</el-button
        >
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
    }
  }
}
</script>
