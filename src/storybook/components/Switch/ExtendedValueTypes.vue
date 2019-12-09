<template>
  <div class="demo">
    <el-tooltip :content="'Switch value: ' + value" placement="top">
      <el-switch
        v-model="value"
        active-color="#13ce66"
        inactive-color="#ff4949"
        active-value="100"
        inactive-value="0"
      >
      </el-switch>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: '100'
    }
  }
}
</script>
