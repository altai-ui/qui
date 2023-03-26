<template>
  <div
    class="q-slider"
    :class="wrapperClasses"
    :style="wrapperStyles"
  >
    <div
      ref="path"
      class="q-slider__path"
      @click="handlePathClick"
    >
      <q-slider-button
        ref="startBtn"
        v-model="startValue"
        @dragging="handleButtonDragging"
        @change="emitChange"
      />

      <q-slider-bar />

      <q-slider-button
        v-if="range"
        ref="endBtn"
        v-model="endValue"
        @dragging="handleButtonDragging"
        @change="emitChange"
      />

      <q-slider-steps v-if="showSteps" />
    </div>

    <q-slider-captions
      v-if="isCaptionsShown"
      @change="handleCaptionChange"
    />
  </div>
</template>

<script>
import QSliderBar from './components/QSliderBar';
import QSliderButton from './components/QSliderButton';
import QSliderSteps from './components/QSliderSteps';
import QSliderCaptions from './components/QSliderCaptions';

export default {
  name: 'QSlider',

  components: {
    QSliderBar,
    QSliderButton,
    QSliderSteps,
    QSliderCaptions
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
      type: [Number, Date],
      default: 0
    },

    /**
     * maximum value
     */
    max: {
      type: [Number, Date],
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
     * caption step size
     */
    captionStep: {
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
     * format to display caption value
     */
    formatCaption: {
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
     * whether Slider is disabled
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
    },

    type: {
      type: String,
      default: 'number',
      validator: value => ['number', 'date'].includes(value)
    }
  },

  provide() {
    return {
      slider: this
    };
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

    isCaptionsShown() {
      return Boolean(this.captions) || Boolean(this.formatCaption);
    },

    minValue() {
      return Math.min(this.startValue, this.endValue);
    },

    maxValue() {
      return Math.max(this.startValue, this.endValue);
    },

    minByType() {
      return this.min instanceof Date && this.type === 'date'
        ? this.min.getTime()
        : this.min;
    },

    maxByType() {
      return this.max instanceof Date && this.type === 'date'
        ? this.max.getTime()
        : this.max;
    },

    wrapperClasses() {
      return {
        'q-slider_is-vertical': this.vertical,
        'q-slider_is-disabled': this.isDisabled
      };
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
      if (val) return;
      this.setValues();
    },

    startValue(val) {
      const values = this.range ? [this.minValue, this.maxValue] : val;
      this.$emit('input', values);
    },

    endValue() {
      if (!this.range) return;
      this.$emit('input', [this.minValue, this.maxValue]);
    },

    range(value) {
      if (!value) return;
      this.endValue = this.max;
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
          this.startValue = Math.max(this.minByType, this.value[0]);
          this.endValue = Math.min(this.maxByType, this.value[1]);
        } else {
          this.startValue = this.minByType;
          this.endValue = this.maxByType;
        }

        this.oldValue = [this.startValue, this.endValue];
      } else {
        if (typeof this.value !== 'number' || Number.isNaN(this.value)) {
          this.startValue = this.minByType;
        } else {
          this.startValue = Math.min(
            this.maxByType,
            Math.max(this.minByType, this.value)
          );
        }

        this.oldValue = this.startValue;
      }
    },

    setValues() {
      if (this.minByType > this.maxByType) return;

      let emitValue;

      if (this.range && Array.isArray(this.value)) {
        if (this.value[1] < this.minByType) {
          emitValue = [this.minByType, this.minByType];
        } else if (this.value[0] > this.maxByType) {
          emitValue = [this.maxByType, this.maxByType];
        } else if (this.value[0] < this.minByType) {
          emitValue = [this.minByType, this.value[1]];
        } else if (this.value[1] > this.maxByType) {
          emitValue = [this.value[0], this.maxByType];
        } else {
          emitValue = this.value;

          if (this.isValueChanged) {
            this.qFormItem?.validateField('change', [
              this.minValue,
              this.maxValue
            ]);

            this.oldValue = this.value.slice();
          }
        }
      } else if (typeof this.value === 'number' && !Number.isNaN(this.value)) {
        if (this.value < this.minByType) {
          emitValue = this.minByType;
        } else if (this.value > this.maxByType) {
          emitValue = this.maxByType;
        } else {
          emitValue = this.value;

          if (this.isValueChanged) {
            this.qFormItem?.validateField('change', this.value);
            this.oldValue = this.value;
          }
        }
      }

      this.$emit('input', emitValue);
    },

    getNearestButton(value) {
      if (Math.abs(this.minValue - value) < Math.abs(this.maxValue - value)) {
        return this.startValue < this.endValue ? 'startBtn' : 'endBtn';
      }

      return this.startValue > this.endValue ? 'startBtn' : 'endBtn';
    },

    setPosition(percent) {
      const targetValue =
        this.minByType + (percent * (this.maxByType - this.minByType)) / 100;

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
        this.qFormItem?.validateField('change');
      });
    },

    getPathSize() {
      return this.$refs.path.getBoundingClientRect();
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

    handleCaptionChange(value) {
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
    },

    handleButtonDragging(value) {
      this.isDragging = value;
    }
  }
};
</script>
