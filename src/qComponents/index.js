import QButton from './QButton';
import QInput from './QInput';
import QTextarea from './QTextarea';

const components = [QButton, QInput, QTextarea];

const install = function(Vue) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });

  //   Vue.use(InfiniteScroll);
  //   Vue.use(Loading.directive);

  //   Vue.prototype.$ELEMENT = {
  //     size: opts.size || '',
  //     zIndex: opts.zIndex || 2000
  //   };

  //   Vue.prototype.$loading = Loading.service;
  //   Vue.prototype.$msgbox = MessageBox;
  //   Vue.prototype.$alert = MessageBox.alert;
  //   Vue.prototype.$confirm = MessageBox.confirm;
  //   Vue.prototype.$prompt = MessageBox.prompt;
  //   Vue.prototype.$notify = Notification;
  //   Vue.prototype.$message = Message;
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  version: '0.0.1',
  //   locale: locale.use,
  install
};
