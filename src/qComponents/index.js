import vClickOutside from 'v-click-outside';

import QButton from './QButton';
import { QCheckbox, QCheckboxGroup } from './QCheckbox';
import { QSelect, QOption } from './QSelect';
import { QRadio, QRadioGroup } from './QRadio';
import QInput from './QInput';
import QInputNumber from './QInputNumber';
import QTextarea from './QTextarea';
import QTag from './QTag';
import QCollapse from './QCollapse';
import QCollapseItem from './QCollapseItem';
import QColorPicker from './QColorPicker';
import QContextMenu from './QContextMenu';
import QMessageBox from './QMessageBox';
import QPopover from './QPopover';
import QScrollbar from './QScrollbar';
import QTabPane from './QTabPane';
import QTabs from './QTabs';
import QDrawer from './QDrawer';

const components = [
  QButton,
  QCheckbox,
  QCheckboxGroup,
  QRadio,
  QRadioGroup,
  QCollapse,
  QCollapseItem,
  QColorPicker,
  QContextMenu,
  QInput,
  QInputNumber,
  QMessageBox,
  QPopover,
  QScrollbar,
  QSelect,
  QOption,
  QTabPane,
  QTextarea,
  QTabs,
  QTag,
  QDrawer
];

let zIndexCounter = 2000;

const install = Vue => {
  // eslint-disable-next-line no-param-reassign
  Vue.prototype.$Q = {};

  Object.defineProperty(Vue.prototype.$Q, 'zIndex', {
    get() {
      zIndexCounter += 1;

      return zIndexCounter;
    }
  });

  Vue.use(vClickOutside);

  // eslint-disable-next-line no-param-reassign
  Vue.prototype.$message = QMessageBox.bind(Vue);

  components.forEach(component => {
    Vue.component(component.name, component);
  });

  //   Vue.use(InfiniteScroll);
  //   Vue.use(Loading.directive);

  //   Vue.prototype.$loading = Loading.service;
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  version: '0.0.1',
  //   locale: locale.use,
  install,

  QButton,
  QCheckbox,
  QCheckboxGroup,
  QCollapse,
  QCollapseItem,
  QContextMenu,
  QInput,
  QInputNumber,
  QMessageBox,
  QPopover,
  QScrollbar,
  QSelect,
  QOption,
  QTabPane,
  QTextarea,
  QTabs,
  QTag,
  QDrawer
};
