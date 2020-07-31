import QDrawer from './src/QDrawer.vue';

/* istanbul ignore next */
QDrawer.install = function(Vue) {
  Vue.component(QDrawer.name, QDrawer);
};

export default QDrawer;
