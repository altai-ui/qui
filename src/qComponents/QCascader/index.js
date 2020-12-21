import QCascader from './src/QCascader';

/* istanbul ignore next */
QCascader.install = function(Vue) {
  Vue.component(QCascader.name, QCascader);
};

export default QCascader;
