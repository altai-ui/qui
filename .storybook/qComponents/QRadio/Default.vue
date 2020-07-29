<template>
  <div>
    <q-radio
      v-model="radio1"
      label="1"
    >Вариант A</q-radio>
    <br /><br />
    <q-radio
      v-model="radio1"
      label="2"
    >Вариант B</q-radio>
    <br /><br />
    <q-radio
      v-model="radio1"
      label="3"
    >Option C</q-radio>
    <br /><br />
    <q-radio
      v-model="radio1"
      label="4"
      disabled
    >Неактивный вариант</q-radio>
    <br /><br />
    <q-radio
      v-model="radio2"
      label="1"
      disabled
    >Выбранный и неактивный вариант</q-radio>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio1: '1',
      radio2: '1'
    };
  }
};
</script>
