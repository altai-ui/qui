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
  (args, { globals }) => ({
    i18n,
    beforeCreate: function() {
      i18n.locale = locale;
      this.$root._i18n = i18n;
    },
    template: '<story />'
  })
];
