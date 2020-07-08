<template>
  <component :is="tagName">
    <transition
      :name="transition"
      @after-leave="destroy"
    >
      <div
        v-show="isPopoverShown"
        ref="qPopper"
        class="popover-content"
        :class="popoverContentClasses"
        :style="popoverContentStyles"
      >
        <div
          v-if="icon"
          class="popover-content__icon"
          :class="icon"
          :style="popoverIconStyles"
        />
        <div
          v-if="title"
          class="popover-content__title"
          :class="popoverTitleClasses"
        >
          {{ title }}
        </div>
        <div class="popover-content__inner">
          <slot />
        </div>
      </div>
    </transition>

    <slot name="reference" />
  </component>
</template>

<script>
import Popper from 'popper.js';

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

const PLACEMENTS = [
  'top',
  'top-start',
  'top-end',
  'right',
  'right-start',
  'right-end',
  'bottom',
  'bottom-start',
  'bottom-end',
  'left',
  'left-start',
  'left-end'
];

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
    }
  },

  data() {
    return {
      popperJS: null,
      referenceElement: null,
      isPopoverShown: false
    };
  },

  computed: {
    popoverContentClasses() {
      return {
        'popover-content_without-icon': !this.icon
      };
    },

    popoverContentStyles() {
      return {
        minWidth:
          typeof this.minWidth === 'number'
            ? `${this.minWidth}px`
            : this.minWidth,
        maxWidth:
          typeof this.maxWidth === 'number'
            ? `${this.maxWidth}px`
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
    },

    popoverTitleClasses() {
      return {
        'popover-content__title_no-content': !this.$slots.default
      };
    }
  },

  watch: {
    isPopoverShown(value) {
      if (value) {
        this.$emit('show');

        if (this.popperJS) {
          this.popperJS.enableEventListeners();
          this.popperJS.scheduleUpdate();
        } else {
          this.createPopper();
        }
      } else {
        if (this.popperJS) {
          this.popperJS.disableEventListeners();
        }

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
      case 'hover':
        eventOn(this.referenceElement, 'mouseover', this.handleMouseOver);
        eventOn(this.referenceElement, 'mouseout', this.onMouseOut);
        eventOn(this.$refs.qPopper, 'mouseover', this.handleMouseOver);
        eventOn(this.$refs.qPopper, 'mouseout', this.onMouseOut);
        break;

      case 'click':
        eventOn(this.referenceElement, 'click', this.togglePopover);
        eventOn(document, 'click', this.handleDocumentClick);
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
  },

  methods: {
    async createPopper() {
      await this.$nextTick();

      const options = {
        placement: this.placement,
        computeStyle: {
          boundariesElement: 'body',
          gpuAcceleration: false
        },
        modifiers: {
          offset: {
            offset: '0, 16px'
          }
        },
        ...this.popperOptions
      };

      this.popperJS = new Popper(
        this.referenceElement,
        this.$refs.qPopper,
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
        this.$refs.qPopper.contains(target)
      ) {
        return;
      }

      this.isPopoverShown = false;
    }
  }
};
</script>
