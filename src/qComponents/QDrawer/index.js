import QDrawer from './src/QDrawer';

QDrawer.install = Vue => {
  Vue.component(QDrawer.name, QDrawer);
};

export default QDrawer;
