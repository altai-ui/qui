<template>
  <div>
    <div>
      <el-checkbox-group v-model="checkboxGroup1">
        <el-checkbox-button v-for="city in cities" :label="city" :key="city">{{
          city
        }}</el-checkbox-button>
      </el-checkbox-group>
    </div>
    <div style="margin-top: 20px">
      <el-checkbox-group v-model="checkboxGroup2" size="medium">
        <el-checkbox-button v-for="city in cities" :label="city" :key="city">{{
          city
        }}</el-checkbox-button>
      </el-checkbox-group>
    </div>
    <div style="margin-top: 20px">
      <el-checkbox-group v-model="checkboxGroup3" size="small">
        <el-checkbox-button
          v-for="city in cities"
          :label="city"
          :disabled="city === 'Beijing'"
          :key="city"
          >{{ city }}</el-checkbox-button
        >
      </el-checkbox-group>
    </div>
    <div style="margin-top: 20px">
      <el-checkbox-group v-model="checkboxGroup4" size="mini" disabled>
        <el-checkbox-button v-for="city in cities" :label="city" :key="city">{{
          city
        }}</el-checkbox-button>
      </el-checkbox-group>
    </div>
  </div>
</template>

<script>
const cityOptions = ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen']

export default {
  data() {
    return {
      checkboxGroup1: ['Shanghai'],
      checkboxGroup2: ['Shanghai'],
      checkboxGroup3: ['Shanghai'],
      checkboxGroup4: ['Shanghai'],
      cities: cityOptions
    }
  }
}
</script>
