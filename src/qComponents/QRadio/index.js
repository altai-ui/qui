import QRadio from './src/QRadio';

/* istanbul ignore next */
QRadio.install = function(Vue) {
  Vue.component(QRadio.name, QRadio);
};

export default QRadio;
