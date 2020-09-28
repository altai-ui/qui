<template>
  <component
    :is="tag"
    class="q-row"
    :class="classes"
  >
    <slot />
  </component>
</template>

<script>
export default {
  name: 'QRow',
  componentName: 'QRow',

  props: {
    /**
     * custom element tag
     */
    tag: {
      type: String,
      default: 'div'
    },
    /**
     * vertical alignment of flex layout.
     * `['start', 'end', 'center', 'baseline', 'stretch']`
     */
    alignV: {
      type: String,
      default: null,
      validator: value =>
        ['start', 'end', 'center', 'baseline', 'stretch'].includes(value)
    },
    /**
     * horizontal alignment of flex layout.
     * `['start', 'end', 'center', 'between', 'around']`
     */
    alignH: {
      type: String,
      default: null,
      validator: value =>
        ['start', 'end', 'center', 'between', 'around'].includes(value)
    }
  },

  computed: {
    classes() {
      return {
        [`q-row_align-h_${this.alignH}`]: Boolean(this.alignH),
        [`q-row_align-v_${this.alignV}`]: Boolean(this.alignV)
      };
    }
  }
};
</script>
