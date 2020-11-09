import QTable from './src/QTable.vue';

QTable.install = function(Vue) {
  Vue.component(QTable.name, QTable);
};

export default QTable;
