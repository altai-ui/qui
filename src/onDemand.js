/* eslint-disable global-require */
/* eslint-disable no-param-reassign */
import vClickOutside from 'v-click-outside';
import { version } from '../package.json';
import { installI18n } from './qComponents/constants/locales';

const install = (
  Vue,
  {
    localization: { locale = 'ru', customI18nMessages = {} } = {},
    zIndexCounter = 2000
  } = {}
) => {
  // define plugins
  Object.defineProperties(Vue.prototype, {
    $Q: {
      value: {
        zIndex: {
          get() {
            zIndexCounter += 1;

            return zIndexCounter;
          }
        },
        locale
      }
    }
  });

  Vue.use(vClickOutside);
  installI18n({ locale, customI18nMessages });
};

const Qui = {
  version,
  install
};

export default Qui;
