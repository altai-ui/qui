<template>
  <li
    :id="nodeId"
    role="menuitem"
    :aria-expanded="inActivePath"
    :tabindex="isDisabled ? null : -1"
    :class="{
      'q-cascader-node': true,
      'in-active-path': inActivePath,
      'q-cascader-node_active': isChecked,
      'q-cascader-node_disabled': isDisabled
    }"
    @click.stop="handleExpand"
  >
    <q-checkbox
      v-if="config.multiple"
      :value="node.checked"
      :indeterminate="node.indeterminate"
      :disabled="isDisabled"
      @change="handleMultiCheckChange"
    />
    <span
      v-else-if="isLeaf && isChecked"
      class="q-icon-check q-cascader-node__prefix"
    />
    <span class="q-cascader-node__label">{{ node.label }}</span>
    <span
      v-if="!isLeaf"
      :class="postfixClasses"
    />
  </li>
</template>

<script>
export default {
  inject: ['panel'],

  props: {
    node: {
      type: Object,
      required: true
    },
    nodeId: { type: String, default: '' }
  },

  computed: {
    postfixClasses() {
      const classes = ['q-cascader-node__postfix'];
      if (this.isDisabled) {
        classes.push('q-icon-lock');
      } else {
        classes.push('q-icon-triangle-right');
      }

      return classes;
    },
    config() {
      return this.panel.config;
    },
    isLeaf() {
      return this.node.isLeaf;
    },
    isDisabled() {
      return this.node.isDisabled;
    },
    checkedValue() {
      return this.panel.checkedValue;
    },
    isChecked() {
      return this.node.isSameNode(this.checkedValue);
    },
    inActivePath() {
      return this.isInPath(this.panel.activePath);
    },
    value() {
      return this.node.getValueByOption();
    },

    disaled() {
      return this.isDisabled;
    }
  },

  methods: {
    handleExpand() {
      const { panel, node, isDisabled, config } = this;
      if (isDisabled) return;
      const { multiple } = config;
      panel.handleExpand(node);
      if (node.isLeaf && !isDisabled && !multiple) {
        this.handleCheckChange();
      }

      panel.handleExpand(node);
    },

    handleCheckChange() {
      const { panel, value, node } = this;
      panel.handleCheckChange(value);
      panel.handleExpand(node);
    },

    handleMultiCheckChange(checked) {
      this.node.doCheck(checked);
      this.panel.calculateMultiCheckedValue();
    },

    isInPath(pathNodes) {
      const { node } = this;
      const selectedPathNode = pathNodes[node.level - 1] || {};
      return selectedPathNode.uid === node.uid;
    }
  }
};
</script>
