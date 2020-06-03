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
    <el-row>
      <el-button
        plain
        @click="open3"
      >
        Very long text
      </el-button>
    </el-row>
    <el-row>
      <el-button
        plain
        @click="open4"
      >
        Very very long text
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
        message: h('i', { style: 'color: teal' }, 'This is a reminder')
      });
    },

    open2() {
      this.$notify({
        message: 'This is a message that does not automatically close',
        duration: 0
      });
    },

    open3() {
      this.$notify({
        message:
          "This is a very long message that does not automatically close so that you can read all what's written here",
        duration: 0
      });
    },

    open4() {
      this.$notify({
        message:
          "This is a very very very very very very very very long message that does not automatically close so that you can read all what's written here",
        duration: 0
      });
    }
  }
};
</script>
