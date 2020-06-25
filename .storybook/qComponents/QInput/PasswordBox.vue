<template>
  <div>
    <div class="block">
      <span class="demonstration">add prop <b>show-password</b></span>
      <q-input
        v-model="input"
        placeholder="Please input password"
        show-password
      />
    </div>
    <div class="block">
      <span
        class="demonstration"
      >add prop <b>show-password</b> (disabled)</span>
      <q-input
        v-model="input"
        placeholder="Please input password"
        show-password
        disabled
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: ''
    };
  }
};
</script>
