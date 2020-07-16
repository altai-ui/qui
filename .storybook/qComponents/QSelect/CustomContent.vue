<template>
  <q-select
    v-model="value"
    placeholder="Select"
  >
    <q-option
      v-for="item in cities"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
      <span style="float: left">{{ item.label }}</span>
      <span style="float: right; font-size: 13px; color: #8492a6">{{
        item.value
      }}</span>
    </q-option>
  </q-select>
</template>

<script>
export default {
  data() {
    return {
      cities: [
        {
          value: 'Beijing',
          label: 'Beijing'
        },
        {
          value: 'Shanghai',
          label: 'Shanghai'
        },
        {
          value: 'Nanjing',
          label: 'Nanjing'
        },
        {
          value: 'Chengdu',
          label: 'Chengdu'
        },
        {
          value: 'Shenzhen',
          label: 'Shenzhen'
        },
        {
          value: 'Guangzhou',
          label: 'Guangzhou'
        }
      ],
      value: ''
    };
  }
};
</script>
