import QForm from './src/QForm';
import QFormItem from './src/QFormItem';

QForm.install = Vue => {
  Vue.component(QForm.name, QForm);
};

QFormItem.install = Vue => {
  Vue.component(QFormItem.name, QFormItem);
};

export { QForm, QFormItem };
