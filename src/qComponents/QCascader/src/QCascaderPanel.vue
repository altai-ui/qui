<template>
  <div class="q-cascader-panel">
    <q-cascader-menu
      v-for="(menu, index) in menus"
      ref="menu"
      :key="index"
      :index="index"
      :nodes="menu"
      @expand="handleExpand"
    />
  </div>
</template>

<script>
import QCascaderMenu from './QCascaderMenu';

export default {
  name: 'QCascaderPanel',
  componentName: 'QCascaderPanel',

  components: {
    QCascaderMenu
  },

  props: {
    /**
     * see QCascader value
     */
    value: { type: [Array, Object], default: null },
    /**
     * see QCascader options
     */
    options: { type: Array, default: null },
    /**
     * noDataText
     */
    noDataText: {
      type: String,
      default: 'Нет данных'
    }
  },

  inject: ['cascader'],

  provide() {
    return {
      panel: this
    };
  },

  data() {
    return {
      activePath: [],
      menus: []
    };
  },

  mounted() {
    this.menus = [this.options];
  },

  methods: {
    handleExpand(index, activeValue) {
      if (this.cascader.multiple && !activeValue.children) return;
      let nextLevel;
      // current level has already opened
      if (this.menus[index]) {
        if (this.activePath.length) {
          this.activePath = this.activePath.slice(0, index);
        }
        this.activePath.push(activeValue.label);

        this.menus = this.menus.slice(0, index + 1);
        nextLevel = activeValue.children;
      }

      if (nextLevel) {
        this.menus.push(nextLevel);
      }
    }
  }
};
</script>
