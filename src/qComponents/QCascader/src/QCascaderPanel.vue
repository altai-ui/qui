<template>
  <div class="q-cascader-panel">
    <q-cascader-menu
      v-for="(menu, index) in menus"
      :key="index"
      role="menu"
      :aria-labelledby="cascader.id"
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
      default: null
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

  watch: {
    options: {
      immediate: true,
      handler() {
        this.menus = [this.options];
      }
    }
  },

  methods: {
    navigateFocus(e) {
      if (
        ['ArrowDown', 'ArrowUp'].includes(e.key) &&
        e.target instanceof HTMLInputElement
      ) {
        const firstNode = this.$el.querySelector(
          `#${this.cascader.id}-node-0-0`
        );
        if (firstNode) {
          firstNode.focus();
        }
      }

      if (!e.target.classList.contains('q-cascader-node')) return;
      const nodeText = e.target.innerText;
      let nodeIndex;
      let currentNodePosition;
      this.menus.forEach((menu, menuIndex) => {
        nodeIndex = menu.findIndex(node => node.label === nodeText);
        if (nodeIndex > -1) {
          currentNodePosition = [menuIndex, nodeIndex];
        }
      });

      let nextNodePosition;

      switch (e.key) {
        case 'ArrowRight':
          nextNodePosition = [
            currentNodePosition[0] + 1,
            currentNodePosition[1]
          ];
          break;
        case 'ArrowLeft':
          nextNodePosition = [
            currentNodePosition[0] === 0 ? 0 : currentNodePosition[0] - 1,
            currentNodePosition[1]
          ];

          break;

        case 'ArrowUp':
          nextNodePosition = [
            currentNodePosition[0],
            currentNodePosition[1] === 0 ? 0 : currentNodePosition[1] - 1
          ];
          break;

        case 'ArrowDown':
          nextNodePosition = [
            currentNodePosition[0],
            currentNodePosition[1] + 1
          ];
          break;
        default:
          break;
      }

      const node = this.$el.querySelector(
        `#${this.cascader.id}-node-${nextNodePosition[0]}-${nextNodePosition[1]}`
      );

      if (node) {
        node.focus();
      }
    },
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
