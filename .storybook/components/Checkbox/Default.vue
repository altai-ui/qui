<template>
  <el-checkbox-group v-model="checkList">
    <el-checkbox label="Вариант A" />
    <br /><br />
    <el-checkbox label="Вариант B" />
    <br /><br />
    <el-checkbox label="Option C" />
    <br /><br />
    <el-checkbox
      label="Неактивный вариант"
      disabled
    />
    <br /><br />
    <el-checkbox
      label="Выбранный и неактивный вариант"
      disabled
    />
  </el-checkbox-group>
</template>

<script>
export default {
  data() {
    return {
      checkList: ['Вариант A', 'Выбранный и неактивный вариант']
    };
  }
};
</script>
