<template>
  <div>
    <div class="block">
      <span class="demonstration">Default Input</span>
      <q-input
        v-model="input1"
        placeholder="Плейсхолдер"
      />
    </div>
    <div class="block">
      <span class="demonstration">add prop <b>clearable</b></span>
      <q-input
        v-model="input2"
        placeholder="Со значением"
        clearable
      />
    </div>
    <div class="block">
      <span class="demonstration">add prop <b>disabled</b></span>
      <q-input
        v-model="input1"
        placeholder="Плейсхолдер"
        disabled
      />
    </div>
    <div class="block">
      <span class="demonstration">add prop <b>disabled</b> (filled)</span>
      <q-input
        v-model="input2"
        placeholder="Со значением"
        disabled
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input1: '',
      input2: 'Значение'
    };
  }
};
</script>
