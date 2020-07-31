<template>
  <component :is="tagName">
    <transition
      :name="transition"
      @after-leave="destroy"
    >
      <div
        v-show="isPopoverShown"
        ref="qPopover"
        class="q-popover"
        :class="popoverClasses"
        :style="popoverStyles"
      >
        <div
          v-if="icon"
          class="q-popover__icon"
          :class="icon"
          :style="popoverIconStyles"
        />
        <div class="q-popover__inner">
          <div
            v-if="title"
            class="q-popover__title"
          >
            {{ title }}
          </div>
          <div
            v-if="$slots.default"
            class="q-popover__content"
          >
            <slot />
          </div>
        </div>
      </div>
    </transition>

    <slot name="reference" />
  </component>
</template>

<script>
import { createPopper } from '@popperjs/core';
import PLACEMENTS from '../../constants/popperPlacements';

function eventOn(element, event, handler) {
  if (element && event && handler) {
    element.addEventListener(event, handler, false);
  }
}

function eventOff(element, event, handler) {
  if (element && event) {
    element.removeEventListener(event, handler, false);
  }
}

const TRIGGERS = ['click', 'hover'];

export default {
  name: 'QPopover',

  props: {
    title: {
      type: String,
      default: ''
    },
    tagName: {
      type: String,
      default: 'span'
    },
    trigger: {
      type: String,
      default: 'click',
      validator: value => TRIGGERS.includes(value)
    },
    placement: {
      type: String,
      default: 'top-start',
      validator: value => PLACEMENTS.includes(value)
    },
    icon: {
      type: String,
      default: ''
    },
    iconColor: {
      type: String,
      default: 'var(--gradient-secondary)'
    },
    transition: {
      type: String,
      default: 'fade-in-linear'
    },
    openDelay: {
      type: Number,
      default: 10
    },
    closeDelay: {
      type: Number,
      default: 10
    },
    minWidth: {
      type: [String, Number],
      default: ''
    },
    maxWidth: {
      type: [String, Number],
      default: ''
    },
    popperOptions: {
      type: Object,
      default: () => ({})
    },
    appendToBody: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      zIndex: null,
      popperJS: null,
      referenceElement: null,
      isPopoverShown: false
    };
  },

  computed: {
    popoverClasses() {
      return {
        'q-popover_without-icon': !this.icon
      };
    },

    popoverStyles() {
      return {
        zIndex: this.zIndex,
        minWidth: Number(this.minWidth)
          ? `${Number(this.minWidth)}px`
          : this.minWidth,
        maxWidth: Number(this.maxWidth)
          ? `${Number(this.maxWidth)}px`
          : this.maxWidth
      };
    },

    popoverIconStyles() {
      const backgroundProperty = this.iconColor.includes('-gradient')
        ? 'backgroundImage'
        : 'backgroundColor';

      return {
        [backgroundProperty]: this.iconColor
      };
    }
  },

  watch: {
    isPopoverShown(value) {
      if (value && !this.popperJS) {
        this.zIndex = this.$Q?.zIndex ?? 2000;
        this.$emit('show');
        this.createPopper();
      } else {
        this.$emit('hide');
      }
    }
  },

  created() {
    if (!this.$slots.reference && process.env.NODE_ENV !== 'production') {
      console.error('QPopover requires reference be provided in the slot.');
    }
  },

  mounted() {
    this.referenceElement = this.$slots?.reference?.[0]?.elm;

    if (!this.referenceElement) return;

    switch (this.trigger) {
      default:
      case 'click':
        eventOn(this.referenceElement, 'click', this.togglePopover);
        eventOn(document, 'click', this.handleDocumentClick);
        break;

      case 'hover':
        eventOn(this.referenceElement, 'mouseover', this.handleMouseOver);
        eventOn(this.referenceElement, 'mouseout', this.onMouseOut);
        eventOn(this.$refs.qPopover, 'mouseover', this.handleMouseOver);
        eventOn(this.$refs.qPopover, 'mouseout', this.onMouseOut);
        break;
    }
  },

  beforeDestroy() {
    eventOff(this.referenceElement, 'click', this.togglePopover);
    eventOff(this.referenceElement, 'mouseout', this.onMouseOut);
    eventOff(this.referenceElement, 'mouseover', this.handleMouseOver);
    eventOff(document, 'click', this.handleDocumentClick);

    this.isPopoverShown = false;
    this.destroy();

    if (this.appendToBody) {
      const { qPopover } = this.$refs;
      qPopover.parentNode.removeChild(qPopover);
    }
  },

  methods: {
    async createPopper() {
      await this.$nextTick();

      if (this.appendToBody) {
        document.body.appendChild(this.$refs.qPopover);
      }

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
              offset: [0, 16]
            }
          }
        ],
        ...this.popperOptions
      };

      this.popperJS = createPopper(
        this.referenceElement,
        this.$refs.qPopover,
        options
      );
    },

    togglePopover() {
      this.isPopoverShown = !this.isPopoverShown;
    },

    destroy() {
      this.isPopoverShown = false;

      if (this.popperJS) {
        this.popperJS.destroy();
        this.popperJS = null;
      }
    },

    handleMouseOver() {
      clearTimeout(this.timer);

      this.timer = setTimeout(() => {
        this.isPopoverShown = true;
      }, this.openDelay);
    },

    onMouseOut() {
      clearTimeout(this.timer);

      this.timer = setTimeout(() => {
        this.isPopoverShown = false;
      }, this.closeDelay);
    },

    handleDocumentClick({ target }) {
      if (
        this.$el.contains(target) ||
        this.referenceElement.contains(target) ||
        this.$refs.qPopover.contains(target)
      ) {
        return;
      }

      this.isPopoverShown = false;
    }
  }
};
</script>
