<template>
  <div class="demo">
    <el-row>
      <el-button
        plain
        @click="open1"
      >
        Success
      </el-button>
    </el-row>
    <el-row>
      <el-button
        plain
        @click="open2"
      >
        Warning
      </el-button>
    </el-row>
    <el-row>
      <el-button
        plain
        @click="open3"
      >
        Info
      </el-button>
    </el-row>
    <el-row>
      <el-button
        plain
        @click="open4"
      >
        Error
      </el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  methods: {
    open1() {
      this.$notify({
        message: 'This is a success message',
        type: 'success'
      });
    },

    open2() {
      this.$notify({
        message: 'This is a warning message',
        type: 'warning'
      });
    },

    open3() {
      this.$notify.info({
        message: 'This is an info message'
      });
    },

    open4() {
      this.$notify.error({
        message: 'This is an error message'
      });
    }
  }
};
</script>
