import QCheckbox from './src/QCheckbox.vue';
import QCheckboxGroup from './src/QCheckbox-group.vue';

/* istanbul ignore next */
QCheckbox.install = function(Vue) {
  Vue.component(QCheckbox.name, QCheckbox);
};

QCheckboxGroup.install = function(Vue) {
  Vue.component(QCheckboxGroup.name, QCheckboxGroup);
};

export { QCheckbox, QCheckboxGroup };
