<template>
  <div>
    <el-radio
      v-model="radio1"
      label="1"
    >Вариант A</el-radio>
    <br /><br />
    <el-radio
      v-model="radio1"
      label="2"
    >Вариант B</el-radio>
    <br /><br />
    <el-radio
      v-model="radio1"
      label="3"
    >Option C</el-radio>
    <br /><br />
    <el-radio
      v-model="radio1"
      label="4"
      disabled
    >Неактивный вариант</el-radio>
    <br /><br />
    <el-radio
      v-model="radio2"
      label="1"
      disabled
    >Выбранный и неактивный вариант</el-radio>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio1: '1',
      radio2: '1'
    };
  }
};
</script>
