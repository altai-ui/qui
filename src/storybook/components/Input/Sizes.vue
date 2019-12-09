<template>
  <div>
    <el-row>
      <el-input placeholder="Please Input" v-model="input1"> </el-input>
    </el-row>
    <el-row>
      <el-input size="medium" placeholder="Please Input" v-model="input2">
      </el-input>
    </el-row>
    <el-row>
      <el-input size="small" placeholder="Please Input" v-model="input3">
      </el-input>
    </el-row>
    <el-row>
      <el-input size="mini" placeholder="Please Input" v-model="input4">
      </el-input>
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
    }
  }
}
</script>
