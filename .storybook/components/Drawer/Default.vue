<template>
  <div class="demo">
    <el-radio-group v-model="direction">
      <el-radio label="ltr">left to right</el-radio>
      <el-radio label="rtl">right to left</el-radio>
      <el-radio label="ttb">top to bottom</el-radio>
      <el-radio label="btt">bottom to top</el-radio>
    </el-radio-group>

    <el-button
      type="primary"
      style="margin-left: 16px;"
      @click="drawer = true"
    >open</el-button>

    <el-drawer
      append-to-body
      title="I am the title"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose"
    >
      <span>Hi, there!</span>
    </el-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      direction: 'rtl'
    };
  },

  methods: {
    handleClose(done) {
      this.$confirm('Are you sure you want to close this?')
        .then(() => {
          done();
        })
        .catch(() => {});
    }
  }
};
</script>
