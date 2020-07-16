<template>
  <q-select
    v-model="value"
    multiple
    filterable
    allow-create
    default-first-option
    clearable
    placeholder="Введите тег"
  >
    <q-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </q-select>
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          value: 'HTML',
          label: 'HTML'
        },
        {
          value: 'CSS',
          label: 'CSS'
        },
        {
          value: 'JavaScript',
          label: 'JavaScript'
        }
      ],
      value: []
    };
  }
};
</script>
