import QRadio from './src/QRadio';

QRadio.install = Vue => {
  Vue.component(QRadio.name, QRadio);
};

export default QRadio;
