<template>
  <div>
    <el-button :loading="isLoading">Loading</el-button>
    <el-button
      plain
      :loading="isLoading"
    >Loading</el-button>
    <div class="block">
      <el-button @click="handleLoadingChange">
        Switch Loading
      </el-button>
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
