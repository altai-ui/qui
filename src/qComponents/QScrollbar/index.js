import QScrollbar from './src/QScrollbar';

/* istanbul ignore next */
QScrollbar.install = function(Vue) {
  Vue.component(QScrollbar.name, QScrollbar);
};

export default QScrollbar;
