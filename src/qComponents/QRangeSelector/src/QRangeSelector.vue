<template>
  <div
    class="q-range-selector"
    :class="wrapperClasses"
    :style="wrapperStyles"
  >
    <div
      ref="path"
      class="q-range-selector__path"
      @click="handlePathClick"
    >
      <range-selector-button
        ref="startBtn"
        v-model="startValue"
      />

      <range-selector-bar />

      <range-selector-button
        v-if="range"
        ref="endBtn"
        v-model="endValue"
      />

      <range-selector-steps v-if="showSteps" />
    </div>

    <range-selector-captions
      v-if="captions"
      @select="handleCaptionSelect"
    />
  </div>
</template>

<script>
import RangeSelectorBar from './components/RangeSelectorBar';
import RangeSelectorButton from './components/RangeSelectorButton';
import RangeSelectorSteps from './components/RangeSelectorSteps';
import RangeSelectorCaptions from './components/RangeSelectorCaptions';

export default {
  name: 'QRangeSelector',

  components: {
    RangeSelectorBar,
    RangeSelectorButton,
    RangeSelectorSteps,
    RangeSelectorCaptions
  },

  inject: {
    qForm: {
      default: null
    },

    qFormItem: {
      default: null
    }
  },

  props: {
    /**
     * binding value
     */
    value: {
      type: [Number, Array],
      default: null
    },

    /**
     * minimum value
     */
    min: {
      type: Number,
      default: 0
    },

    /**
     * maximum value
     */
    max: {
      type: Number,
      default: 100
    },

    /**
     * step size
     */
    step: {
      type: Number,
      default: 1
    },

    /**
     * whether to display breakpoints
     */
    showSteps: {
      type: Boolean,
      default: false
    },

    /**
     * whether to display tooltip value
     */
    showTooltip: {
      type: Boolean,
      default: true
    },

    /**
     * format to display tooltip value
     */
    formatTooltip: {
      type: Function,
      default: null
    },

    /**
     * object consisting of a key and a value for quick selection
     */
    captions: {
      type: Object,
      default: null
    },

    /**
     * whether RangeSelector is disabled
     */
    disabled: {
      type: Boolean,
      default: false
    },

    /**
     * whether to select a range
     */
    range: {
      type: Boolean,
      default: false
    },

    /**
     * vertical mode
     */
    vertical: {
      type: Boolean,
      default: false
    },

    /**
     * Slider height, required in vertical mode
     */
    height: {
      type: String,
      default: null
    }
  },

  data() {
    return {
      startValue: null,
      endValue: null,
      oldValue: null,
      isDragging: false
    };
  },

  computed: {
    isDisabled() {
      return this.disabled || (this.qForm?.disabled ?? false);
    },

    wrapperClasses() {
      return {
        'q-range-selector_is-vertical': this.vertical,
        'q-range-selector_is-disabled': this.isDisabled
      };
    },

    minValue() {
      return Math.min(this.startValue, this.endValue);
    },

    maxValue() {
      return Math.max(this.startValue, this.endValue);
    },

    wrapperStyles() {
      return this.vertical ? { height: this.height } : {};
    },

    isValueChanged() {
      if (this.range) {
        return ![this.minValue, this.maxValue].every(
          (value, index) => value === this.oldValue[index]
        );
      }
      return this.value !== this.oldValue;
    }
  },

  watch: {
    value(val, oldVal) {
      if (
        this.isDragging ||
        (Array.isArray(val) &&
          Array.isArray(oldVal) &&
          val.every((item, i) => item === oldVal[i]))
      ) {
        return;
      }

      this.setValues();
    },

    isDragging(val) {
      if (!val) {
        this.setValues();
      }
    },

    startValue(val) {
      if (this.range) {
        this.$emit('input', [this.minValue, this.maxValue]);
      } else {
        this.$emit('input', val);
      }
    },

    endValue() {
      if (this.range) {
        this.$emit('input', [this.minValue, this.maxValue]);
      }
    },

    min() {
      this.setValues();
    },

    max() {
      this.setValues();
    }
  },

  mounted() {
    this.setupValues();
  },

  methods: {
    setupValues() {
      if (this.range) {
        if (Array.isArray(this.value)) {
          this.startValue = Math.max(this.min, this.value[0]);
          this.endValue = Math.min(this.max, this.value[1]);
        } else {
          this.startValue = this.min;
          this.endValue = this.max;
        }

        this.oldValue = [this.startValue, this.endValue];
      } else {
        if (typeof this.value !== 'number' || Number.isNaN(this.value)) {
          this.startValue = this.min;
        } else {
          this.startValue = Math.min(this.max, Math.max(this.min, this.value));
        }

        this.oldValue = this.startValue;
      }
    },

    setValues() {
      if (this.min > this.max) return;

      if (this.range && Array.isArray(this.value)) {
        if (this.value[1] < this.min) {
          this.$emit('input', [this.min, this.min]);
        } else if (this.value[0] > this.max) {
          this.$emit('input', [this.max, this.max]);
        } else if (this.value[0] < this.min) {
          this.$emit('input', [this.min, this.value[1]]);
        } else if (this.value[1] > this.max) {
          this.$emit('input', [this.value[0], this.max]);
        } else {
          this.startValue = this.value[0];
          this.endValue = this.value[1];

          if (this.isValueChanged) {
            // eslint-disable-next-line no-unused-expressions
            this.qFormItem?.validateField('change', [
              this.minValue,
              this.maxValue
            ]);
            // this.dispatch('qFormItem', 'q.form.change', [this.minValue, this.maxValue])
            this.oldValue = this.value.slice();
          }
        }
      } else if (
        !this.range &&
        typeof this.value === 'number' &&
        !Number.isNaN(this.value)
      ) {
        if (this.value < this.min) {
          this.$emit('input', this.min);
        } else if (this.value > this.max) {
          this.$emit('input', this.max);
        } else {
          this.startValue = this.value;

          if (this.isValueChanged) {
            // eslint-disable-next-line no-unused-expressions
            this.qFormItem?.validateField('change', this.value);
            // this.dispatch('qFormItem', 'q.form.change', this.value)
            this.oldValue = this.value;
          }
        }
      }
    },

    getPathSize() {
      return this.$refs.path.getBoundingClientRect();
    },

    getNearestButton(value) {
      let result;

      if (Math.abs(this.minValue - value) < Math.abs(this.maxValue - value)) {
        result = this.startValue < this.endValue ? 'startBtn' : 'endBtn';
      } else {
        result = this.startValue > this.endValue ? 'startBtn' : 'endBtn';
      }

      return result;
    },

    setPosition(percent) {
      const targetValue = this.min + (percent * (this.max - this.min)) / 100;

      if (!this.range) {
        this.$refs.startBtn.setPosition(percent);
        return;
      }

      const currentBtn = this.getNearestButton(targetValue);
      this.$refs[currentBtn].setPosition(percent);
    },

    emitChange() {
      this.$nextTick(() => {
        this.$emit(
          'change',
          this.range ? [this.minValue, this.maxValue] : this.value
        );
        // eslint-disable-next-line no-unused-expressions
        this.qFormItem?.validateField('change');
      });
    },

    handlePathClick({ clientX, clientY }) {
      if (this.isDisabled || this.isDragging) return;

      const { width, height, bottom, left } = this.getPathSize();

      if (this.vertical) {
        this.setPosition(((bottom - clientY) / height) * 100);
      } else {
        this.setPosition(((clientX - left) / width) * 100);
      }

      this.emitChange();
    },

    handleCaptionSelect(value) {
      if (this.isDisabled) return;

      if (!this.range) {
        this.startValue = value;
        return;
      }

      if (this.getNearestButton(value) === 'startBtn') {
        this.startValue = value;
      } else {
        this.endValue = value;
      }
    }
  }
};
</script>
