<template>
  <div>
    <q-radio
      v-model="radio1"
      value="1"
      label="Вариант A"
    />
    <br /><br />
    <q-radio
      v-model="radio1"
      value="2"
      label="Вариант B"
    />
    <br /><br />
    <q-radio
      v-model="radio1"
      value="3"
      label="Option C"
    />
    <br /><br />
    <q-radio
      v-model="radio1"
      disabled
      value="4"
      label="Неактивный вариант"
    />
    <br /><br />
    <q-radio
      v-model="radio2"
      disabled
      value="1"
      label="Выбранный и неактивный вариант"
    />
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
