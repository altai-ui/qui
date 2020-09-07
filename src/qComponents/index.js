import vClickOutside from 'v-click-outside';

import { version } from '../../package.json';

import QButton from './QButton';
import QBreadcrumbs from './QBreadcrumbs';
import { QCheckbox, QCheckboxGroup } from './QCheckbox';
import QCol from './QCol';
import { QSelect, QOption } from './QSelect';
import { QRadio, QRadioGroup } from './QRadio';
import { QCascader, QCascaderPanel } from './QCascader';
import QInput from './QInput';
import QInputNumber from './QInputNumber';
import QTextarea from './QTextarea';
import QTag from './QTag';
import QCollapse from './QCollapse';
import QCollapseItem from './QCollapseItem';
import QColorPicker from './QColorPicker';
import QContextMenu from './QContextMenu';
import QDialog from './QDialog';
import QMessageBox from './QMessageBox';
import QNotification from './QNotification';
import QPagination from './QPagination';
import QPopover from './QPopover';
import QRow from './QRow';
import QScrollbar from './QScrollbar';
import { QTabs, QTabPane } from './QTabs';
import QDrawer from './QDrawer';

const components = [
  QButton,
  QBreadcrumbs,
  QCascader,
  QCascaderPanel,
  QCheckbox,
  QCheckboxGroup,
  QRadio,
  QRadioGroup,
  QRow,
  QCol,
  QCollapse,
  QCollapseItem,
  QColorPicker,
  QContextMenu,
  QInput,
  QInputNumber,
  QMessageBox,
  QPagination,
  QPopover,
  QScrollbar,
  QSelect,
  QOption,
  QTextarea,
  QTabs,
  QTabPane,
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
  Vue.prototype.$notify = QNotification;
  // eslint-disable-next-line no-param-reassign
  Vue.prototype.$dialog = QDialog.bind(Vue);
  // eslint-disable-next-line no-param-reassign
  Vue.prototype.$message = QMessageBox.bind(Vue);

  components.forEach(component => {
    Vue.component(component.name, component);
  });
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  version,
  install
};

export {
  QBreadcrumbs,
  QButton,
  QCascader,
  QCascaderPanel,
  QCheckbox,
  QCheckboxGroup,
  QCol,
  QCollapse,
  QCollapseItem,
  QColorPicker,
  QContextMenu,
  QDialog,
  QDrawer,
  QInput,
  QInputNumber,
  QMessageBox,
  QNotification,
  QPagination,
  QPopover,
  QRadio,
  QRadioGroup,
  QRow,
  QScrollbar,
  QSelect,
  QOption,
  QTabs,
  QTabPane,
  QTag,
  QTextarea
};
