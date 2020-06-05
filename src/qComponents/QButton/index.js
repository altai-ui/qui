import QButton from './src/QButton.vue';

/* istanbul ignore next */
QButton.install = function(Vue) {
  Vue.component(QButton.name, QButton);
};

export default QButton;
