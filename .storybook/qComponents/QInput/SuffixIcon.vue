<template>
  <div>
    <div class="block">
      <span
        class="demonstration"
      >add prop <b>suffix-icon</b>, choose any q-icon</span>
      <q-input
        v-model="input1"
        placeholder="С иконкой"
        suffix-icon="q-icon-search"
      />
    </div>
    <div class="block">
      <span
        class="demonstration"
      >with <b>suffix-icon</b> and <b>clearable</b></span>
      <q-input
        v-model="input2"
        placeholder="С иконкой и очисткой"
        suffix-icon="q-icon-search"
        clearable
      />
    </div>
    <div class="block">
      <span
        class="demonstration"
      >with <b>suffix-icon</b> and <b>disabled</b></span>
      <q-input
        v-model="input1"
        placeholder="С иконкой и неактивный"
        suffix-icon="icon-search"
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
