<template>
  <span
    class="q-tag"
    @click="handleClick"
  >
    <slot />
    <span
      v-if="closable"
      class="q-tag__close q-icon-close"
      @click="handleClose"
    />
  </span>
</template>

<script>
export default {
  name: 'QTag',
  props: {
    closable: { type: Boolean, default: false }
  },
  methods: {
    handleClose(event) {
      event.stopPropagation();
      this.$emit('close', event);
    },
    handleClick(event) {
      this.$emit('click', event);
    }
  }
};
</script>
