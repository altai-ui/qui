<template>
  <div class="q-context-wrapper">
    <div
      ref="reference"
      class="q-context-trigger"
      @click="handleTriggerClick"
    >
      <slot v-if="$slots.default" />
      <button
        v-else
        class="q-context-trigger__default"
      />
    </div>

    <div
      v-show="isContextMenuShown"
      ref="qContextMenu"
      class="q-context-menu"
    >
      <button
        v-for="(item, index) in menuItems"
        :key="index"
        class="q-context-menu__item"
        :class="{ 'q-context-menu__item_with-icon': item.icon }"
        @click.prevent="handleItemClick(item.action)"
      >
        <span
          v-if="item.icon"
          class="q-context-menu__icon"
          :class="item.icon"
        />
        {{ item.name }}
      </button>
    </div>
  </div>
</template>

<script>
import { createPopper } from '@popperjs/core';

export default {
  name: 'QContextMenu',

  componentName: 'QContextMenu',

  props: {
    position: {
      type: String,
      default: 'left',
      validator: value => ['left', 'right'].includes(value)
    },
    menuItems: {
      type: Array,
      required: true
    },
    appendToBody: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      isContextMenuShown: false
    };
  },

  computed: {
    placement() {
      return this.position === 'right' ? 'bottom-start' : 'bottom-end';
    }
  },

  beforeDestroy() {
    document.removeEventListener('click', this.handleDocumentClick);

    const { qContextMenu } = this.$refs;

    if (qContextMenu?.parentNode === document.body)
      document.body.removeChild(qContextMenu);
  },

  methods: {
    handleDocumentClick({ target }) {
      if (
        this.$refs.reference?.contains(target) ||
        this.$refs.qContextMenu.contains(target)
      ) {
        return;
      }

      this.closePopper();
    },

    createPopper() {
      document.addEventListener('click', this.handleDocumentClick);
      this.isContextMenuShown = true;

      if (this.appendToBody) document.body.appendChild(this.$refs.qContextMenu);

      const options = {
        placement: this.placement,
        computeStyle: {
          boundariesElement: 'body',
          gpuAcceleration: false
        },
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, -40]
            }
          }
        ]
      };

      this.popperJS = createPopper(
        this.$refs.reference,
        this.$refs.qContextMenu,
        options
      );
    },

    handleTriggerClick() {
      if (this.isContextMenuShown) {
        this.closePopper();
        return;
      }

      this.createPopper();
    },

    handleItemClick(actionName) {
      this.$emit('action', actionName, this.entity);
      this.closePopper();
    },

    closePopper() {
      document.removeEventListener('click', this.handleDocumentClick);

      if (this.appendToBody) document.body.removeChild(this.$refs.qContextMenu);

      this.isContextMenuShown = false;
    }
  }
};
</script>
