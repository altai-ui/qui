import QPopover from './src/QPopover.vue';

/* istanbul ignore next */
QPopover.install = function(Vue) {
  Vue.component(QPopover.name, QPopover);
};

export default QPopover;
