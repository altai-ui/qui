import QContextMenu from './src/QContextMenu.vue';

/* istanbul ignore next */
QContextMenu.install = function(Vue) {
  Vue.component(QContextMenu.name, QContextMenu);
};

export default QContextMenu;
