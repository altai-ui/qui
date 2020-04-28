<template>
  <div>
    <div style=" display: flex;margin-top: 20px">
      <el-checkbox
        v-model="checked1"
        label="Option1"
        border
      />
      <el-checkbox
        v-model="checked2"
        label="Option2"
        border
      />
    </div>
    <div style=" display: flex;margin-top: 20px">
      <el-checkbox
        v-model="checked3"
        label="Option1"
        border
        size="medium"
      />
      <el-checkbox
        v-model="checked4"
        label="Option2"
        border
        size="medium"
      />
    </div>
    <div style=" display: flex;margin-top: 20px">
      <el-checkbox-group
        v-model="checkboxGroup1"
        size="small"
        style="display: flex"
      >
        <el-checkbox
          label="Option1"
          border
        />
        <el-checkbox
          label="Option2"
          border
          disabled
        />
      </el-checkbox-group>
    </div>
    <div style=" display: flex;margin-top: 20px">
      <el-checkbox-group
        v-model="checkboxGroup2"
        size="mini"
        style="display: flex"
      >
        <el-checkbox
          label="Option1"
          border
        />
        <el-checkbox
          label="Option2"
          border
        />
      </el-checkbox-group>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked1: true,
      checked2: false,
      checked3: false,
      checked4: true,
      checkboxGroup1: [],
      checkboxGroup2: []
    };
  }
};
</script>
