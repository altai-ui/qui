<template>
  <div class="q-context-wrapper">
    <div
      ref="trigger"
      class="q-context-trigger"
      @click="openMenu"
    >
      <slot v-if="$slots.default" />
      <button
        v-else
        class="q-context-trigger__default"
      />
    </div>

    <div ref="menu">
      <div
        v-if="isShown"
        v-click-outside="closeMenu"
        class="q-context-menu"
        :class="{ 'q-context-menu_is-fixed': !appendToBody }"
        :style="contextMenuPosition"
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
  </div>
</template>

<script>
export default {
  name: 'QContextMenu',

  componentName: 'QContextMenu',

  props: {
    position: {
      type: String,
      default: 'left',
      validator: value => ['left', 'right'].includes(value)
    },
    appendToBody: {
      type: Boolean,
      default: false
    },
    menuItems: {
      type: Array,
      required: true
    },
    rootSelector: {
      type: String,
      default: 'body'
    }
  },

  data() {
    return {
      isShown: false,
      axisX: 0,
      axisY: 0
    };
  },

  computed: {
    contextMenuPosition() {
      return {
        left: `${this.axisX}px`,
        top: `${this.axisY}px`
      };
    }
  },

  beforeDestroy() {
    if (this.appendToBody) {
      const { menu } = this.$refs;
      menu.parentNode.removeChild(menu);
    }
  },

  methods: {
    openMenu() {
      this.isShown = true;

      this.$nextTick(() => {
        if (this.appendToBody) {
          document.body.appendChild(this.$refs.menu);
        }

        this.calculatePosition();

        document
          .querySelector(this.rootSelector)
          .addEventListener('scroll', this.calculatePosition, {
            passive: true
          });

        window.addEventListener('resize', this.calculatePosition, {
          passive: true
        });
      });
    },

    calculatePosition() {
      const { x, y, width } = this.$refs.trigger.getBoundingClientRect();
      const menuWidth = this.$refs.menu.children[0].clientWidth;
      const bodyWidth = document.body.getBoundingClientRect().width;

      this.axisY = y;

      const formulaForWideMenu =
        this.position === 'right' ? x : x + width - menuWidth;
      const formulaForNarrowMenu =
        this.position === 'right' ? x + width - menuWidth : x;

      if (menuWidth > width) {
        this.axisX = formulaForWideMenu;
      } else {
        this.axisX = formulaForNarrowMenu;
      }

      if (this.axisX + menuWidth > bodyWidth) {
        this.axisX = bodyWidth - menuWidth;
      } else if (this.axisX < 0) {
        this.axisX = 0;
      }
    },

    closeMenu() {
      this.isShown = false;
      document
        .querySelector(this.rootSelector)
        .removeEventListener('scroll', this.calculatePosition);

      window.removeEventListener('resize', this.calculatePosition);
      this.$emit('close');
    },

    handleItemClick(actionName) {
      this.$emit('action', actionName, this.entity);
      this.closeMenu();
    }
  }
};
</script>
