import Vue from 'vue';
import Qui from '../src/qComponents';
import VueI18n from 'vue-i18n';
import messages from './locales';

Vue.use(VueI18n);
Vue.use(Qui, {
  localization: {
    locale: 'en'
  }
});

export const parameters = {
  layout: 'centered',
  controls: { expanded: true },
  docs: {
    inlineStories: true
  }
};

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'light',
    toolbar: {
      icon: 'circlehollow',
      // array of plain string values or MenuItem shape (see below)
      items: ['light', 'dark']
    }
  },
  locale: {
    name: 'Locale',
    description: 'Internationalization locale',
    defaultValue: 'en',
    toolbar: {
      icon: 'globe',
      items: [
        { value: 'en', right: '🇺🇸', title: 'English' },
        { value: 'ru', right: '🇷🇺', title: 'Русский' }
      ]
    }
  }
};

const i18n = new VueI18n({
  locale: 'en',
  messages,
  silentTranslationWarn: true,
  silentFallbackWarn: true,
  fallbackRoot: true
});

export const decorators = [
  () => ({
    i18n,
    beforeCreate: function() {
      this.$root._i18n = i18n;
    },
    template: '<story />'
  })
];
