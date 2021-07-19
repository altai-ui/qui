<template>
  <div
    class="q-range-selector"
    :class="{ 'q-range-selector_is-vertical': vertical }"
  >
    <div
      ref="path"
      class="q-range-selector__path"
      @click="handlePathClick"
    >
      <div
        class="q-range-selector__bar"
        :style="barStyle"
      />

      <range-selector-button
        :tab-index="0"
        :value="firstValue"
        :opposite-value="secondValue"
        :percent="firstPercent"
        @drag-moving="handleDragMoving($event, 0)"
        @position-change="handleButtonPositionChange($event, 0)"
      />

      <range-selector-button
        v-if="range && secondValue"
        :tab-index="1"
        :value="secondValue"
        :opposite-value="firstValue"
        :percent="secondPercent"
        @drag-moving="handleDragMoving($event, 1)"
        @position-change="handleButtonPositionChange($event, 1)"
      />

      <div
        v-if="showSteps"
        class="q-range-selector__step-wrapper"
      >
        <div
          v-for="(stepItem, key) in steps"
          :key="key"
          class="q-range-selector__step"
          :style="getStepPositionStyle(stepItem)"
        />
      </div>

      <template v-if="captionsList.length">
        <div
          v-for="(caption, key) in captionsList"
          :key="key"
          class="q-range-selector__caption"
          :style="getStepPositionStyle(caption.position)"
        >
          {{ item.value }}
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import RangeSelectorButton from './components/RangeSelectorButton';

export default {
  name: 'QRangeSelector',

  components: {
    RangeSelectorButton
  },

  props: {
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    showTooltip: {
      type: Boolean,
      default: true
    },
    step: {
      type: Number,
      default: 1,
      validator: value => value > 0
    },
    value: {
      type: [Number, String, Array],
      default: 0,
      validator: value => {
        if (Array.isArray(value)) {
          return value.every(val => !Number.isNaN(Number(val)));
        }

        return !Number.isNaN(Number(value));
      }
    },
    showSteps: {
      type: Boolean,
      default: false
    },
    range: {
      type: Boolean,
      default: false
    },
    vertical: {
      type: Boolean,
      default: false
    },
    stickToSteps: {
      type: Boolean,
      default: false
    },
    captions: {
      type: Object,
      default: null
    }
  },

  data() {
    return {
      firstValue: null,
      secondValue: null
    };
  },

  computed: {
    precision() {
      let factor = 1;
      let precision = 0;
      while (Math.round(this.step * factor) / factor !== this.step) {
        factor *= 10;
        precision += 1;
      }
      return precision;
    },

    captionsList() {
      if (!this.captions) return [];

      return Object.entries(this.captions).map(([key, value]) => ({
        position: Number(key),
        value
      }));
    },

    firstPercent() {
      return this.getPercent(this.firstValue);
    },

    secondPercent() {
      if (!this.range) return null;

      return this.getPercent(this.secondValue);
    },

    barStyle() {
      const widthHeight = this.secondPercent
        ? `${this.secondPercent - this.firstPercent}%`
        : `${this.firstPercent}%`;

      const leftBottom = this.range ? `${this.firstPercent}%` : 0;

      if (this.vertical) {
        return {
          height: widthHeight,
          bottom: leftBottom
        };
      }
      return {
        width: widthHeight,
        left: leftBottom
      };
    },

    steps() {
      if (this.min > this.max) return [];

      const stepsCount = (this.max - this.min) / this.step;
      const stepWidth = (100 * this.step) / (this.max - this.min);

      return Array.from({ length: stepsCount + 1 }, (_, i) => i * stepWidth);
    }
  },

  watch: {
    value: {
      handler() {
        this.getValues();
      },
      immediate: true
    }
  },

  methods: {
    getPercent(value) {
      if (value > this.max) return this.max.toFixed(3);
      if (value < this.min) return this.min.toFixed(3);

      const left = (100 * (value - this.min)) / (this.max - this.min);
      return left.toFixed(3);
    },

    getValues() {
      const minValue = Array.isArray(this.value)
        ? Math.max(this.min, this.value[0])
        : Math.max(this.min, this.value);

      this.firstValue = minValue;

      if (!this.range) {
        this.secondValue = null;
        return;
      }

      if (Array.isArray(this.value)) {
        this.secondValue = Math.min(this.max, this.value[1]);
        return;
      }

      this.secondValue = this.max;
    },

    handlePathClick(event) {
      const { left, bottom, width, height } = this.getPathSize();

      const newPercent = this.vertical
        ? ((bottom - event.clientY) / height) * 100
        : ((event.clientX - left) / width) * 100;

      const newValue = this.min + (newPercent * (this.max - this.min)) / 100;

      let targetValue = Number(newValue);

      if (this.stickToSteps) {
        targetValue = this.steps.reduce((a, b) =>
          Math.abs(b - newValue) < Math.abs(a - newValue) ? b : a
        );
      }

      targetValue = targetValue.toFixed(this.precision);

      if (!this.range) {
        if (targetValue > this.max) targetValue = this.max;
        if (targetValue < this.min) targetValue = this.min;

        this.changesEmmiter(targetValue);
        return;
      }

      let isFirstButtonChanged = true;

      if (
        Math.abs(this.firstValue - targetValue) <
        Math.abs(this.secondValue - targetValue)
      ) {
        isFirstButtonChanged = this.firstValue < this.secondValue;
      } else {
        isFirstButtonChanged = this.firstValue > this.secondValue;
      }

      if (
        (isFirstButtonChanged && targetValue > this.secondValue) ||
        (!isFirstButtonChanged && targetValue < this.firstValue)
      )
        return;

      const newValues = isFirstButtonChanged
        ? [targetValue, this.secondValue]
        : [this.firstValue, targetValue];

      this.changesEmmiter(newValues);
    },

    getPathSize() {
      return this.$refs.path.getBoundingClientRect();
    },

    getStepPositionStyle(position) {
      const newPosition = ((position - this.min) * 100) / (this.max - this.min);

      if (this.vertical) return { bottom: `${newPosition}%` };

      return { left: `${newPosition}%` };
    },

    handleDragMoving(newValue, tabIndex) {
      if (tabIndex === 0) {
        this.firstValue = Number(newValue).toFixed(this.precision);
        return;
      }

      this.secondValue = Number(newValue).toFixed(this.precision);
    },

    changesEmmiter(newValue) {
      this.$emit('input', newValue);
      this.$emit('change', newValue);
    },

    handleButtonPositionChange(newValue, tabIndex) {
      const fixedNewValue = Number(newValue).toFixed(this.precision);

      const passedData =
        tabIndex === 0
          ? [Math.max(this.min, fixedNewValue), this.secondValue]
          : [this.firstValue, Math.min(this.max, fixedNewValue)];

      this.changesEmmiter(this.range ? passedData : fixedNewValue);
    }
  }
};
</script>
