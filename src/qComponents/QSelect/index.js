import QOption from './src/QOption';
import QSelect from './src/QSelect.vue';

QSelect.install = function(Vue) {
  Vue.component(QSelect.name, QSelect);
};

QOption.install = function(Vue) {
  Vue.component(QOption.name, QOption);
};

export { QSelect, QOption };
