<template>
  <div>
    <div class="block">
      <div class="demonstration">
        <q-color-picker
          v-model="color"
          alpha-shown
        />
      </div>
    </div>
    <div class="block">
      <div class="demonstration">
        <q-color-picker
          v-model="color"
          disabled
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      color: '#f25'
    };
  }
};
</script>
