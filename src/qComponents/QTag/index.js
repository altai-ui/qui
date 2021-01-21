import QTag from './src/QTag';

QTag.install = Vue => {
  Vue.component(QTag.name, QTag);
};

export default QTag;
