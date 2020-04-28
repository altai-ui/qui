<template>
  <div>
    <el-row>
      <el-input
        v-model="input1"
        placeholder="Please Input"
      />
    </el-row>
    <el-row>
      <el-input
        v-model="input2"
        size="medium"
        placeholder="Please Input"
      />
    </el-row>
    <el-row>
      <el-input
        v-model="input3"
        size="small"
        placeholder="Please Input"
      />
    </el-row>
    <el-row>
      <el-input
        v-model="input4"
        size="mini"
        placeholder="Please Input"
      />
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input1: '',
      input2: '',
      input3: '',
      input4: ''
    };
  }
};
</script>
