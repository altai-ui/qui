import QPopover from './src/index.vue';

/* istanbul ignore next */
QPopover.install = function(Vue) {
  Vue.component(QPopover.name, QPopover);
};

export default QPopover;
