<template>
  <div
    class="q-tag"
    :class="{
      'q-tag_closable': closable
    }"
  >
    <div class="q-tag__text">
      <!-- @slot text of QTag -->
      <slot />
    </div>
    <button
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
     * whether close button shown
     */
    closable: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    handleClose(event) {
      /**
       * triggers when the close button is clicked
       */
      this.$emit('close', event);
    }
  }
};
</script>
