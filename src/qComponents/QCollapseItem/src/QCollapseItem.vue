<template>
  <div
    class="q-collapse-item"
    :class="{
      'q-collapse-item_active': isActive
    }"
  >
    <button
      class="q-collapse-item__header"
      @click="handleTabClick"
    >
      <slot name="title">
        <div class="q-collapse-item__title">{{ title }}</div>
      </slot>
      <div
        class="q-collapse-item__icon"
        :class="icon"
      />
    </button>

    <q-collapse-transition>
      <div
        v-show="isActive"
        class="q-collapse-item__body"
      >
        <div class="q-collapse-item__content">
          <slot />
        </div>
      </div>
    </q-collapse-transition>
  </div>
</template>

<script>
import QCollapseTransition from '../../helpers/collapse-transition';

export default {
  name: 'QCollapseItem',
  componentName: 'QCollapseItem',

  components: { QCollapseTransition },

  props: {
    title: {
      type: String,
      default: ''
    },
    name: {
      type: [String, Number],
      default: null
    }
  },

  data() {
    return {
      activeNames: []
    };
  },

  computed: {
    preparedName() {
      return this.name ?? this.$parent?.uniqueId('default-collapse-name-');
    },

    isActive() {
      return this.$parent.activeNames?.includes(this.preparedName) ?? false;
    },

    icon() {
      return this.isActive ? 'q-icon-minus' : 'q-icon-plus';
    }
  },

  methods: {
    handleTabClick() {
      this.$parent.updateValue(this.preparedName);
    }
  }
};
</script>
