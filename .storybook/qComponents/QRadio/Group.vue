<template>
  <div>
    <div class="block">
      <span class="demonstration">default radio group</span>
      <q-radio-group v-model="radio">
        <q-radio
          :value="3"
          label="Option A"
        />
        <q-radio
          :value="6"
          label="Option B"
        />
        <q-radio
          :value="9"
          label="Option C"
        />
      </q-radio-group>
    </div>

    <div class="block">
      <span class="demonstration">add prop <b>direction="horizontal"</b></span>

      <q-radio-group
        v-model="radio"
        direction="horizontal"
      >
        <q-radio :value="3">Option A</q-radio>
        <q-radio :value="6">Option B</q-radio>
        <q-radio :value="9">Option C</q-radio>
      </q-radio-group>
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
