<template>
  <div>
    <el-row>
      <el-input
        v-model="input1"
        placeholder="Плейсхолдер"
      />
    </el-row>
    <el-row>
      <el-input
        v-model="input2"
        placeholder="Со значением"
        clearable
      />
    </el-row>
    <el-row>
      <el-input
        v-model="input1"
        placeholder="Плейсхолдер"
        disabled
      />
    </el-row>
    <el-row>
      <el-input
        v-model="input2"
        placeholder="Со значением"
        disabled
      />
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input1: '',
      input2: 'Значение'
    };
  }
};
</script>
