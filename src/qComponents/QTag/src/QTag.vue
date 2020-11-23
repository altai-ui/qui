<template>
  <div
    class="q-tag"
    :class="{
      'q-tag_closable': closable
    }"
  >
    <div class="q-tag__text">
      <slot />
    </div>
    <div
      v-if="closable"
      class="q-tag__close q-icon-close"
      @click.stop="handleClose"
    />
  </div>
</template>

<script>
export default {
  name: 'QTag',
  componentName: 'QTag',

  props: {
    closable: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    handleClose(event) {
      this.$emit('close', event);
    }
  }
};
</script>
