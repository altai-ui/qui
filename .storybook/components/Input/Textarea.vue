<template>
  <div>
    <el-row>
      <el-input
        v-model="textarea1"
        placeholder="Плейсхолдер"
        type="textarea"
        :rows="3"
      />
    </el-row>
    <el-row>
      <el-input
        v-model="textarea2"
        placeholder="Со значением"
        type="textarea"
        clearable
        :autosize="{ minRows: 2, maxRows: 6 }"
      />
    </el-row>
    <el-row>
      <el-input
        v-model="textarea1"
        placeholder="Плейсхолдер (неактивный)"
        type="textarea"
        disabled
        :rows="5"
      />
    </el-row>
    <el-row>
      <el-input
        v-model="textarea2"
        placeholder="Со значением (неактивный)"
        type="textarea"
        disabled
        :autosize="{ minRows: 2, maxRows: 6 }"
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
