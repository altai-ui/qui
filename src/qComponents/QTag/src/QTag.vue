<template>
  <div
    class="q-tag"
    :class="{
      'q-tag_closable': closable
    }"
    :title="title"
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
    /**
     * whether Tag can be removed
     */
    closable: {
      type: Boolean,
      default: false
    },
    /**
     * QTag's title
     */
    title: {
      type: String,
      default: ''
    }
  },

  methods: {
    handleClose(event) {
      this.$emit('close', event);
    }
  }
};
</script>
