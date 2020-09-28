<template>
  <transition name="fade">
    <div
      v-show="isShown"
      class="q-picker-dropdown"
    >
      <div class="q-picker-dropdown__base">
        <q-color-svpanel
          ref="sv"
          :hue="hue"
          :saturation.sync="saturation"
          :value.sync="value"
        />

        <q-color-hue-slider
          ref="hue"
          :hue.sync="hue"
        />
      </div>

      <q-color-alpha-slider
        v-if="alphaShown"
        ref="alpha"
        :color="rgbString"
        :alpha.sync="alpha"
      />

      <div class="q-picker-dropdown__footer">
        <div class="q-picker-dropdown__input">
          <q-input
            v-model="tempColor"
            :validate-event="false"
            @keyup.native.enter="updateHSVA(tempColor)"
            @blur="updateHSVA(tempColor)"
          />
        </div>

        <button
          v-if="isClearBtnShown"
          class="q-picker-dropdown__btn-clear"
          @click="handleClearBtnClick"
        >
          {{ clearBtnText }}
        </button>

        <q-button @click="handleConfirmBtnClick">
          {{ confirmBtnText }}
        </q-button>
      </div>
    </div>
  </transition>
</template>

<script>
import Color from 'color';

import QButton from '../../QButton';
import QColorSvpanel from './QColorSvpanel';
import QColorAlphaSlider from './QColorAlphaSlider';
import QColorHueSlider from './QColorHueSlider';

export default {
  name: 'PickerDropdown',
  componentName: 'PickerDropdown',

  components: {
    QButton,
    QColorSvpanel,
    QColorHueSlider,
    QColorAlphaSlider
  },

  props: {
    isShown: {
      type: Boolean,
      default: false
    },
    isClearBtnShown: {
      type: Boolean,
      default: false
    },
    clearBtnText: {
      type: String,
      default: 'Очистить'
    },
    confirmBtnText: {
      type: String,
      default: 'Применить'
    },
    color: {
      type: String,
      default: null
    },
    colorFormat: {
      type: String,
      default: 'hex',
      validator: value => ['hex', 'rgb'].includes(value)
    },
    alphaShown: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      tempColor: '',
      hue: 0,
      saturation: 100,
      value: 100,
      alpha: 100
    };
  },

  computed: {
    colorModel() {
      return Color({
        h: this.hue,
        s: this.saturation,
        v: this.value
      });
    },

    rgbString() {
      return this.colorModel.rgb().string();
    },

    colorString() {
      if (this.alphaShown || this.colorFormat === 'rgb') {
        return this.colorModel
          .alpha(this.alpha / 100)
          .rgb()
          .string();
      }
      return this.colorModel.hex();
    }
  },

  watch: {
    async isShown(value) {
      if (!value) return;
      this.updateHSVA(this.color);
      this.tempColor = this.colorString;

      await this.$nextTick();

      const { sv, hue, alpha } = this.$refs;
      sv && sv.update();
      hue && hue.update();
      alpha && alpha.update();
    },

    color: {
      immediate: true,
      handler(value) {
        this.updateHSVA(value);
      }
    },

    colorString: {
      immediate: true,
      handler(value) {
        this.tempColor = value;
      }
    }
  },

  methods: {
    updateHSVA(value) {
      try {
        const { valpha, color } = Color(value).hsv();

        this.hue = color[0];
        this.saturation = color[1];
        this.value = color[2];
        this.alpha = valpha * 100;
      } catch (error) {
        // do nothing
      }
    },

    handleClearBtnClick() {
      this.$emit('clear');
    },

    handleConfirmBtnClick() {
      this.$emit('pick', this.colorString);
    }
  }
};
</script>
