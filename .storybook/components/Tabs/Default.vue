<template>
  <div class="block">
    <el-tabs
      v-model="activeName"
      @tab-click="handleClick"
    >
      <el-tab-pane
        label="User"
        name="first"
      >Here put content</el-tab-pane>
      <el-tab-pane
        label="Config"
        name="second"
      >Here put another content</el-tab-pane>
      <el-tab-pane
        label="Role"
        name="third"
      >Awesome!</el-tab-pane>
      <el-tab-pane
        label="Task"
        name="fourth"
        disabled
      >Task</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: 'first'
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>
