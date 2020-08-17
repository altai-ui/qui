<template>
  <q-scrollbar
    :id="menuId"
    class="q-cascader-menu"
    :wrap-class="classes"
    view-class="q-cascader-menu__list"
  >
    <div
      v-if="isEmpty"
      class="q-cascader-menu__empty-text"
    >
      {{ noDataText }}
    </div>
    <cascader-node
      v-for="node in nodes"
      v-else
      :key="node.uid"
      :node="node"
      :node-id="`${menuId}-${node.uid}`"
      :aria-haspopup="node.hasChildren"
      :aria-owns="node.hasChildren ? menuId : null"
      @expand="handleExpand"
    />
  </q-scrollbar>
</template>

<script>
import CascaderNode from './QCascaderNode.vue';

export default {
  name: 'QCascaderMenu',

  components: {
    CascaderNode
  },

  inject: ['panel'],

  props: {
    nodes: {
      type: Array,
      required: true
    },
    index: { type: Number, default: 0 }
  },

  data() {
    return {
      activeNode: null,
      id: Math.floor(Math.random() * 10000)
    };
  },

  computed: {
    classes() {
      const classes = ['q-cascader-menu__wrap'];
      const currentNodesCount = this.panel.menus[this.index]?.length;
      const nextNodesCount = this.panel.menus[this.index + 1]?.length;
      const prevNodesCount = this.panel.menus[this.index - 1]?.length;
      if (this.panel.menus?.length > 1) {
        if (this.index === 0 || nextNodesCount >= currentNodesCount) {
          classes.push('q-cascader-menu__wrap_no-right-borders');
        }

        if (this.index > 0 && prevNodesCount >= currentNodesCount) {
          classes.push('q-cascader-menu__wrap_no-left-bottom-border');
        }

        if (prevNodesCount) {
          classes.push('q-cascader-menu__wrap_no-left-top-border');
        }

        if (nextNodesCount) {
          classes.push('q-cascader-menu__wrap_no-right-top-border');
        }

        if (currentNodesCount > nextNodesCount) {
          classes.push('q-cascader-menu__wrap_with-right-borders');
        }
      }

      return classes;
    },

    isEmpty() {
      return !this.nodes.length;
    },

    menuId() {
      return `cascader-menu-${this.id}-${this.index}`;
    },

    noDataText() {
      return this.panel?.props?.noDataText ?? 'Нет данных';
    }
  },

  methods: {
    handleExpand(e) {
      this.activeNode = e.target;
    }
  }
};
</script>
