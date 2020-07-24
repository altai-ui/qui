<template>
  <q-checkbox-group v-model="checkList">
    <q-checkbox label="Вариант A" />
    <br /><br />
    <q-checkbox label="Вариант B" />
    <br /><br />
    <q-checkbox label="Option C" />
    <br /><br />
    <!-- <q-checkbox label="Option C" true-label="GO" /> -->
    <q-checkbox
      label="Неактивный вариант"
      disabled
    />
    <br /><br />
    <q-checkbox
      label="Выбранный и неактивный вариант"
      disabled
    />
  </q-checkbox-group>
</template>

<script>
export default {
  data() {
    return {
      checkList: ['Вариант A', 'Выбранный и неактивный вариант']
    };
  }
};
</script>
