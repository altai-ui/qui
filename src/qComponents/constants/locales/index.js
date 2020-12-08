/* eslint-disable no-underscore-dangle */
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import { merge } from 'lodash-es';

import ru from './ru';
import en from './en';

const installI18n = ({ locale, customI18nMessages }) => {
  const isI18nExist = Boolean(Vue.prototype._i18n);
  if (isI18nExist) return;
  Vue.use(VueI18n);
  const i18n = new VueI18n({
    locale,
    messages: merge({ en, ru }, customI18nMessages)
  });
  Vue.prototype._i18n = i18n;
};

export default {
  en,
  ru
};

export { ru, en, installI18n };
