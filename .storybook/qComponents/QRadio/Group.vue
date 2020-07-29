<template>
  <div>
    <div class="block">
      <q-radio-group v-model="radio">
        <q-radio :label="3">Option A</q-radio>
        <q-radio :label="6">Option B</q-radio>
        <q-radio :label="9">Option C</q-radio>
      </q-radio-group>
    </div>
    <br /><br />
    <div class="block">
      <div class="demonstration">
        add prop <b>direction="horizontal"</b>
        <q-radio-group
          v-model="radio"
          direction="horizontal"
        >
          <q-radio :label="3">Option A</q-radio>
          <q-radio :label="6">Option B</q-radio>
          <q-radio :label="9">Option C</q-radio>
        </q-radio-group>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio: 3
    };
  }
};
</script>
