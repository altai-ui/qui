<template>
  <div class="demo">
    <el-row>
      <div class="block">
        <span class="demonstration">Default</span>
        <el-select
          v-model="value1"
          multiple
          placeholder="Select"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
    </el-row>
    <el-row>
      <div class="block">
        <span class="demonstration">Collapse tags</span>
        <el-select
          v-model="value2"
          multiple
          collapse-tags
          placeholder="Select"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          value: 'Option1',
          label: 'Option1'
        },
        {
          value: 'Option2',
          label: 'Option2'
        },
        {
          value: 'Option3',
          label: 'Option3'
        },
        {
          value: 'Option4',
          label: 'Option4'
        },
        {
          value: 'Option5',
          label: 'Option5'
        }
      ],
      value1: [],
      value2: []
    };
  }
};
</script>
