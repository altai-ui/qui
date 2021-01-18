<template>
  <div class="q-cascader-menu">
    <div :class="classes">
      <q-scrollbar wrap-class="q-cascader-menu__scrollbar">
        <div
          v-if="isEmpty"
          class="q-cascader-menu__empty-text"
        >
          {{ noDataText }}
        </div>
        <div
          v-for="(node, key) in nodes"
          v-else
          :key="key"
          :class="getNodeClass(node)"
          :tabindex="getTabIndex(node)"
          @click="e => handleExpand(e, node)"
          @keyup.enter="e => handleExpand(e, node)"
        >
          <q-checkbox
            v-if="cascader.multiple"
            :value="getChecked(node)"
            :indeterminate="getIndeterminate(node)"
            @change="isChecked => handleValueChange(node, isChecked)"
          />
          <span class="q-cascader-node__label">{{ node.label }}</span>
          <span
            v-if="node.children"
            :class="postfixClasses"
          />
        </div>
      </q-scrollbar>
    </div>
  </div>
</template>

<script>
const getCheckedChildren = (option, checkedValues) => {
  const checkedArray = [];
  const goToTheLast = childOption => {
    if (childOption.children) {
      childOption.children.forEach(goToTheLast);
    } else {
      checkedArray.push(checkedValues.includes(childOption.value));
    }
  };

  goToTheLast(option);

  return checkedArray;
};

export default {
  name: 'QCascaderMenu',
  componentName: 'QCascaderMenu',

  inject: ['panel', 'cascader'],

  props: {
    nodes: {
      type: Array,
      required: true
    },
    index: { type: Number, default: 0 }
  },

  computed: {
    postfixClasses() {
      return {
        'q-cascader-node__postfix': true,
        'q-icon-lock': this.disabled,
        'q-icon-triangle-right': !this.disabled
      };
    },
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

    noDataText() {
      return this.panel?.noDataText ?? this.$t('QCascader.noDataText');
    }
  },

  methods: {
    getTabIndex(node) {
      if (this.cascader.multiple && !node.children) {
        return '-1';
      }

      return '0';
    },

    getIndeterminate(node) {
      if (
        !this.cascader.checkedValues ||
        this.cascader.checkedValues.includes(node.value) ||
        this.cascader.checkStrictly
      )
        return false;

      const checkedArray = getCheckedChildren(
        node,
        this.cascader.checkedValues
      );

      if (checkedArray.every(Boolean)) return false;
      if (checkedArray.some(Boolean)) return true;

      return false;
    },

    checkStrictly(value) {
      const result = new Set(this.cascader.checkedValues);
      if (result.has(value)) {
        result.delete(value);
      } else {
        result.add(value);
      }
      this.cascader.emit(Array.from(result));
    },

    check(value, isChecked) {
      const result = new Set(this.cascader.checkedValues);
      if (result.has(value)) {
        result.delete(value);
      } else {
        const findAndCheckChildren = ({ option = {}, checkMode = false }) => {
          // try to find checked value and run check mode to all children if success
          if (checkMode || option.value === value) {
            if (option.children) {
              // it's not the last level, go to next
              option.children.forEach(childOption => {
                findAndCheckChildren({ option: childOption, checkMode: true });
              });
              // it is the last level, check if value have already added
            } else if (this.cascader.checkStrictly) {
              if (result.has(option.value)) {
                result.delete(option.value);
              } else {
                result.add(option.value);
              }
              // if no stricltly, check all or delete all
            } else if (isChecked) {
              result.add(option.value);
            } else {
              result.delete(option.value);
            }
          } else if (option.children) {
            // just go to the next level
            option.children.forEach(childOption => {
              findAndCheckChildren({ option: childOption });
            });
          }
        };

        this.cascader.options.forEach(option => {
          // go throw the children to the last level
          findAndCheckChildren({ option });
        });
      }

      this.cascader.emit(Array.from(result));
    },

    handleValueChange({ value }, isChecked) {
      if (this.cascader.checkStrictly) {
        this.checkStrictly(value);
      } else {
        this.check(value, isChecked);
      }
    },

    getChecked(node) {
      if (!this.cascader.checkedValues) return false;
      if (this.cascader.checkStrictly) {
        if (Array.isArray(this.cascader.checkedValues)) {
          return Boolean(
            this.cascader.checkedValues.find(value => value === node.value)
          );
        }

        return false;
      }

      const checkedArray = getCheckedChildren(
        node,
        this.cascader.checkedValues
      );

      return checkedArray.every(Boolean);
    },

    getNodeClass(node) {
      const isActive = this.panel.activePath.find(
        value => value === node.label
      );
      return {
        'q-cascader-node': true,
        'q-cascader-node_active': isActive
      };
    },

    handleExpand(e, value) {
      if (!value.children && !this.cascader.multiple) {
        this.cascader.emit(value.value);
      }
      this.$emit('expand', this.index, value);
    }
  }
};
</script>
