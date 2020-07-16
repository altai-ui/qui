import QTag from './src/QTag.vue';

/* istanbul ignore next */
QTag.install = function(Vue) {
  Vue.component(QTag.name, QTag);
};

export default QTag;
