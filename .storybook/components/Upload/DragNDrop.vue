<template>
  <div class="block">
    <span class="demonstration">For el-upload class 'upload' is required </span>
    <el-upload
      :class="classes"
      drag
      action="https://jsonplaceholder.typicode.com/posts/"
      :on-change="handleChange"
      :on-error="handleError"
      :file-list="fileList"
    >
      <i class="q-icon-cloud-upload"></i>
      <div class="el-upload__text">загрузить файл</div>
    </el-upload>
  </div>
</template>

<script>
export default {
  data() {
    return {
      error: false
    };
  },
  computed: {
    classes() {
      return {
        upload: true,
        error: this.error
      };
    }
  },
  methods: {
    handleChange(file, fileList) {
      console.log(file, fileList);
    },
    handleError(error) {
      console.log(error);
      this.error = true;
    }
  }
};
</script>
