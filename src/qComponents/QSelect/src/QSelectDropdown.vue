<template>
  <div
    class="q-select-dropdown"
    :class="{ 'q-select-dropdown_multiple': $parent.multiple }"
    :style="{ minWidth: minWidth }"
  >
    <slot />
  </div>
</template>

<script type="text/babel">
export default {
  name: 'QSelectDropdown',

  componentName: 'QSelectDropdown',

  data() {
    return {
      minWidth: ''
    };
  },

  watch: {
    '$parent.inputWidth': function() {
      this.minWidth = `${this.$parent.$el.getBoundingClientRect().width}px`;
    }
  }
};
</script>
