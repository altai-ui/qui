import QColorPicker from './src/QColorPicker.vue';

/* istanbul ignore next */
QColorPicker.install = function(Vue) {
  Vue.component(QColorPicker.name, QColorPicker);
};

export default QColorPicker;
