<template>
  <div>
    <el-row>
      <el-input
        v-model="input"
        placeholder="Please input password"
        show-password
      />
    </el-row>
    <el-row>
      <el-input
        v-model="input"
        placeholder="Please input password"
        show-password
        disabled
      />
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: ''
    };
  }
};
</script>
