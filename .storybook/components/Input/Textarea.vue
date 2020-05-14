<template>
  <div>
    <el-row>
      <el-input
        v-model="textarea1"
        placeholder="Плейсхолдер"
        type="textarea"
        :rows="2"
      />
    </el-row>
    <el-row>
      <el-input
        v-model="textarea2"
        placeholder="Со значением"
        type="textarea"
        clearable
        :rows="2"
      />
    </el-row>
    <el-row>
      <el-input
        v-model="textarea1"
        placeholder="Плейсхолдер"
        type="textarea"
        disabled
        :rows="2"
      />
    </el-row>
    <el-row>
      <el-input
        v-model="textarea2"
        placeholder="Со значением"
        type="textarea"
        disabled
        :rows="2"
      />
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      textarea1: '',
      textarea2: 'Значение'
    };
  }
};
</script>
