<template>
  <div class="demo">
    <el-row>
      <el-button
        plain
        @click="open1"
      >
        Closes automatically
      </el-button>
    </el-row>
    <el-row>
      <el-button
        plain
        @click="open2"
      >
        Won't close automatically
      </el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  methods: {
    open1() {
      const h = this.$createElement;

      this.$notify({
        title: 'Title',
        message: h('i', { style: 'color: teal' }, 'This is a reminder')
      });
    },

    open2() {
      this.$notify({
        title: 'Prompt',
        message: 'This is a message that does not automatically close',
        duration: 0
      });
    }
  }
};
</script>
