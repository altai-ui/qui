<template>
  <div
    class="q-range-selector"
    :class="{ 'is-vertical': vertical }"
  >
    <div
      ref="path"
      class="q-range-selector__path"
      @click="onPathClick"
    >
      <div
        class="q-range-selector__bar"
        :style="barStyle"
      />

      <range-selector-button
        :tab-index="0"
        :value="firstValue"
        :styles="firstButtonStyle"
        :show-tooltip="showTooltip"
        :step="step"
        @on-decrease="onKeyDown"
        @on-increase="onKeyDown"
      />

      <range-selector-button
        v-if="range && secondValue"
        :tab-index="1"
        :value="secondValue"
        :styles="secondButtonStyle"
        :show-tooltip="showTooltip"
        :step="step"
        @on-decrease="onKeyDown"
        @on-increase="onKeyDown"
      />

      <template v-if="showSteps">
        <div
          v-for="(item, key) in steps"
          :key="key"
          class="q-range-selector__stop"
          :style="getStopStyle(item)"
        />
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
      default: 1
    },
    value: {
      type: [Number, Array],
      default: 0
    },
    showSteps: {
      type: Boolean,
      default: false
    },
    range: {
      type: Boolean,
      default: true
    },
    vertical: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    firstValue() {
      if (!this.range) {
        return Array.isArray(this.value) ? this.value[0] : this.value;
      }
      if (Array.isArray(this.value)) return Math.max(this.min, this.value[0]);

      return Math.max(this.min, this.value);
    },

    secondValue() {
      if (!this.range) return null;
      if (Array.isArray(this.value)) return Math.min(this.max, this.value[1]);

      return this.max;
    },

    firstPercent() {
      const value = this.firstValue;

      let left =
        value > this.max
          ? 100
          : (100 * (value - this.min)) / (this.max - this.min);

      if (value < this.min) left = 0;

      return left.toFixed(3);
    },

    secondPercent() {
      if (!this.range) return null;

      const value = this.secondValue;

      let left =
        value > this.max
          ? 100
          : (100 * (value - this.min)) / (this.max - this.min);

      if (value < this.min) left = 0;

      return left.toFixed(3);
    },

    firstButtonStyle() {
      if (this.vertical) return { bottom: `${this.firstPercent}%` };

      return { left: `${this.firstPercent}%` };
    },

    secondButtonStyle() {
      if (this.vertical) return { bottom: `${this.secondPercent}%` };

      return { left: `${this.secondPercent}%` };
    },

    barStyle() {
      if (this.vertical) {
        return {
          height: this.secondPercent
            ? `${this.secondPercent - this.firstPercent}%`
            : `${this.firstPercent}%`,
          bottom: this.range ? `${this.firstPercent}%` : 0
        };
      }
      return {
        width: this.secondPercent
          ? `${this.secondPercent - this.firstPercent}%`
          : `${this.firstPercent}%`,
        left: this.range ? `${this.firstPercent}%` : 0
      };
    },

    steps() {
      if (!this.showSteps || this.min > this.max) return [];

      const stopsCount = (this.max - this.min) / this.step;
      const stepWidth = (100 * this.step) / (this.max - this.min);

      return Array.from({ length: stopsCount }, (_, i) => i * stepWidth);
    }
  },

  methods: {
    onPathClick(event) {
      const {
        left,
        bottom,
        width,
        height
      } = this.$refs.path.getBoundingClientRect();
      const newValue = this.vertical
        ? ((bottom - event.clientY) / height) * 100
        : ((event.clientX - left) / width) * 100;

      const targetValue = this.steps.length
        ? this.steps.reduce((a, b) => {
            return Math.abs(b - newValue) < Math.abs(a - newValue) ? b : a;
          })
        : newValue;

      if (!this.range) {
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

      const newValues = isFirstButtonChanged
        ? [targetValue, this.secondValue]
        : [this.firstValue, targetValue];

      this.changesEmmiter(newValues);
    },

    getStopStyle(position) {
      if (this.vertical) return { bottom: `${position}%` };

      return { left: `${position}%` };
    },

    changesEmmiter(newValue) {
      const passedData = this.range
        ? newValue.map(val => Number(val.toFixed()))
        : Number(newValue.toFixed());

      this.$emit('input', passedData);
      this.$emit('change', passedData);
    },

    onKeyDown({ newValue, tabIndex }) {
      const passedData =
        tabIndex === 0
          ? [newValue, this.secondValue]
          : [this.firstValue, newValue];

      this.changesEmmiter(this.range ? passedData : newValue);
    }
  }
};
</script>
