import QRadio from './src/QRadio';
import QRadioGroup from './src/QRadioGroup';

/* istanbul ignore next */
QRadio.install = function(Vue) {
  Vue.component(QRadio.name, QRadio);
};

/* istanbul ignore next */
QRadioGroup.install = function(Vue) {
  Vue.component(QRadioGroup.name, QRadioGroup);
};

export { QRadio, QRadioGroup };
