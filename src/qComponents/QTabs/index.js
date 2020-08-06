import QTabs from './src/QTabs.vue';
import QTabPane from './src/QTabPane.vue';

QTabs.install = function(Vue) {
  Vue.component(QTabs.name, QTabs);
};

QTabPane.install = function(Vue) {
  Vue.component(QTabPane.name, QTabPane);
};

export { QTabs, QTabPane };
