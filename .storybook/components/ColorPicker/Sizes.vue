<template>
  <div class="demo">
    <el-row>
      <el-color-picker v-model="color" />
    </el-row>
    <el-row>
      <el-color-picker
        v-model="color"
        size="medium"
      />
    </el-row>
    <el-row>
      <el-color-picker
        v-model="color"
        size="small"
      />
    </el-row>
    <el-row>
      <el-color-picker
        v-model="color"
        size="mini"
      />
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      color: '#409EFF'
    };
  }
};
</script>
