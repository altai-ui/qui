<template>
  <div>
    <div class="block">
      <span
        class="demonstration"
      >add prop <b>:loading="true"</b> for showing loading animation</span>
      <el-row>
        <el-button :loading="isLoading">Loading</el-button>
        <el-button
          plain
          :loading="isLoading"
        >Loading</el-button>
      </el-row>
    </div>
    <div class="block">
      <span class="demonstration">Try!</span>
      <el-row>
        <el-button @click="handleLoadingChange">
          Switch Loading
        </el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  data() {
    return {
      isLoading: false
    };
  },

  methods: {
    handleLoadingChange() {
      this.isLoading = !this.isLoading;
    }
  }
};
</script>
