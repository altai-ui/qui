<template>
  <div>
    <div class="block">
      <span
        class="demonstration"
      >add prop <b>show-symbol-limit</b> and set limit
        <b>maxlength="10"</b></span>
      <q-input
        v-model="input1"
        maxlength="10"
        show-symbol-limit
      />
    </div>
    <div class="block">
      <span
        class="demonstration"
      >add prop <b>show-symbol-limit</b> and set non-strict limit,
        <b>counter-limit="10"</b></span>
      <q-input
        v-model="input2"
        :counter-limit="10"
        show-symbol-limit
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input1: '',
      input2: 'Очень длинное значение.'
    };
  }
};
</script>
