import QDatePicker from './src/QDatePicker.vue';

/* istanbul ignore next */
QDatePicker.install = function install(Vue) {
  Vue.component(QDatePicker.name, QDatePicker);
};

export default QDatePicker;
