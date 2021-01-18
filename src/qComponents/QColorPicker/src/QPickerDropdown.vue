<template>
  <transition name="fade">
    <div
      v-show="isShown"
      ref="dropdown"
      v-click-outside="closeDropdown"
      class="q-picker-dropdown"
      tabindex="-1"
      @keyup.esc="closeDropdown"
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

        <q-button
          v-if="isClearBtnShown"
          theme="link"
          @click="handleClearBtnClick"
        >
          {{ $t('QColorPicker.clear') }}
        </q-button>

        <q-button @click="handleConfirmBtnClick">
          {{ $t('QColorPicker.confirm') }}
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
  name: 'QPickerDropdown',
  componentName: 'QPickerDropdown',

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
      focusAfterClosed: null,
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
      if (!value) {
        document.removeEventListener('focus', this.trapFocus, true);
        await this.$nextTick();
        this.focusAfterClosed?.focus();
        return;
      }

      document.addEventListener('focus', this.trapFocus, true);
      this.updateHSVA(this.color);
      this.tempColor = this.colorString;
      this.focusAfterClosed = document.activeElement;

      await this.$nextTick();

      this.$refs.dropdown.focus();

      const { sv, hue, alpha } = this.$refs;
      sv?.update();
      hue?.update();
      alpha?.update();
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
    closeDropdown() {
      this.$emit('close');
    },

    trapFocus(event) {
      if (!this.$refs.dropdown.contains(event.target)) {
        this.$refs.dropdown.focus();
      }
    },

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
