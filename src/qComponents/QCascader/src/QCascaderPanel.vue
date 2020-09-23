<template>
  <div class="q-cascader-panel">
    <q-cascader-menu
      v-for="(menu, index) in menus"
      ref="menu"
      :key="index"
      :index="index"
      :nodes="menu"
    />
  </div>
</template>

<script>
import { isEqual, isEmpty } from 'lodash-es';
import scrollIntoView from './scroll-into-view';
import Store from './store';
import QCascaderMenu from './QCascaderMenu';

const DefaultProps = {
  multiple: false,
  emitPath: true, // wether to emit an array of all levels value in which node is located
  value: 'value',
  label: 'label',
  children: 'children',
  leaf: 'leaf',
  disabled: 'disabled'
};

export default {
  name: 'QCascaderPanel',

  components: {
    QCascaderMenu
  },

  props: {
    value: { type: [Array, Object], default: () => [] },
    options: { type: Array, default: null },
    props: {
      type: Object,
      default: () => ({})
    }
  },

  provide() {
    return {
      panel: this
    };
  },

  data() {
    return {
      checkedValue: null,
      checkedNodePaths: [],
      store: [],
      menus: [],
      activePath: []
    };
  },

  computed: {
    config() {
      return { ...DefaultProps, ...this.props };
    },
    multiple() {
      return this.config.multiple;
    }
  },

  watch: {
    options: {
      handler() {
        this.initStore();
      },
      immediate: true,
      deep: true
    },
    value() {
      this.syncCheckedValue();
    },
    checkedValue(val) {
      if (isEqual(val, this.value)) return;
      this.$emit('input', val);
      this.$emit('change', val);
    }
  },

  mounted() {
    if (!isEmpty(this.value)) {
      this.syncCheckedValue();
    }
  },

  methods: {
    initStore() {
      const { config, options } = this;
      this.store = new Store(options, config);
      this.menus = [this.store.getNodes()];
      this.syncMenuState();
    },
    syncCheckedValue() {
      const { value, checkedValue } = this;
      if (!isEqual(value, checkedValue)) {
        this.checkedValue = value;
        this.syncMenuState();
      }
    },
    syncMenuState() {
      this.syncActivePath();
      this.multiple && this.syncMultiCheckState();
      this.$nextTick(this.scrollIntoView);
    },
    syncMultiCheckState() {
      const nodes = this.getFlattedNodes();

      nodes.forEach(node => {
        node.syncCheckState(this.checkedValue);
      });
    },
    syncActivePath() {
      const { store, multiple, activePath, checkedValue } = this;

      if (!isEmpty(activePath)) {
        const nodes = activePath.map(node =>
          this.getNodeByValue(node.getValue())
        );
        this.expandNodes(nodes);
      } else if (!isEmpty(checkedValue)) {
        const value = multiple ? checkedValue[0] : checkedValue;
        const checkedNode = this.getNodeByValue(value) || {};
        const nodes = (checkedNode.pathNodes || []).slice(0, -1);
        this.expandNodes(nodes);
      } else {
        this.activePath = [];
        this.menus = [store.getNodes()];
      }
    },
    expandNodes(nodes) {
      nodes.forEach(node => this.handleExpand(node));
    },
    handleExpand(node) {
      const { activePath } = this;
      const { level } = node;
      const path = activePath.slice(0, level - 1);
      const menus = this.menus.slice(0, level);

      if (!node.isLeaf) {
        path.push(node);
        menus.push(node.children);
      }

      this.activePath = path;
      this.menus = menus;
    },
    handleCheckChange(value) {
      this.checkedValue = value;
    },

    calculateMultiCheckedValue() {
      this.checkedValue = this.getCheckedNodes().map(node =>
        node.getValueByOption()
      );
    },

    scrollIntoView() {
      const menus = this.$refs.menu || [];
      menus.forEach(menu => {
        const menuElement = menu.$el;
        if (menuElement) {
          const container = menuElement.querySelector('.q-scrollbar__wrap');
          const activeNode =
            menuElement.querySelector('.q-cascader-node.is-active') ||
            menuElement.querySelector('.q-cascader-node.in-active-path');
          scrollIntoView(container, activeNode);
        }
      });
    },
    getNodeByValue(val) {
      return this.store.getNodeByValue(val);
    },
    getFlattedNodes() {
      return this.store.getFlattedNodes(true, true);
    },
    getCheckedNodes() {
      const { checkedValue, multiple } = this;
      if (multiple) {
        const nodes = this.getFlattedNodes();
        return nodes.filter(node => node.checked);
      }
      return isEmpty(checkedValue) ? [] : [this.getNodeByValue(checkedValue)];
    },
    clearCheckedNodes() {
      const { multiple, emitPath } = this.config;
      if (multiple) {
        this.getCheckedNodes()
          .filter(node => !node.isDisabled)
          .forEach(node => node.doCheck(false));
        this.calculateMultiCheckedValue();
      } else {
        this.checkedValue = emitPath ? [] : null;
      }
    }
  }
};
</script>
