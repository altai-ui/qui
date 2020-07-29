import QCheckbox from './src/QCheckbox.vue';
import QCheckboxGroup from './src/QCheckboxGroup.vue';

/* istanbul ignore next */
QCheckbox.install = function(Vue) {
  Vue.component(QCheckbox.name, QCheckbox);
};

QCheckboxGroup.install = function(Vue) {
  Vue.component(QCheckboxGroup.name, QCheckboxGroup);
};

export { QCheckbox, QCheckboxGroup };
