import QCascader from './src/QCascader';
import QCascaderPanel from './src/QCascaderPanel';

/* istanbul ignore next */
QCascader.install = function(Vue) {
  Vue.component(QCascader.name, QCascader);
};

QCascaderPanel.install = function (Vue) {
  Vue.component(QCascaderPanel.name, QCascaderPanel);
};

export { QCascader, QCascaderPanel };
