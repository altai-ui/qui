<template>
  <div>
    <el-row>
      <el-input
        v-model="input1"
        placeholder="С q иконкой"
        suffix-icon="q-icon-search"
      />
    </el-row>
    <el-row>
      <el-input
        v-model="input2"
        placeholder="С el иконкой и очисткой"
        suffix-icon="el-icon-s-home"
        clearable
      />
    </el-row>
    <el-row>
      <el-input
        v-model="input1"
        placeholder="С q иконкой и неактивный"
        suffix-icon="icon-search"
        disabled
      />
    </el-row>
    <el-row>
      <el-input
        v-model="input2"
        placeholder="С el иконкой и неактивный"
        suffix-icon="el-icon-s-home"
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
