# design-system

## run sandbox (run here)

```bash
yarn storybook
npm run storybook
```

## install to project (run from project)

```bash
yarn add @qvant/qui
```

## Import into Scss

main styles

```scss
@import '~@qvant/qui/src/main.scss';
```

import all styles

```scss
@import '~@qvant/qui/src/qStyles/main.scss';
```

...or components separately

```scss
@import '~@qvant/qui/src/qComponents/QBreadcrumbs/src/q-breadcrumbs.scss';
@import '~@qvant/qui/src/qComponents/QButton/src/q-button.scss';
@import '~@qvant/qui/src/qComponents/QCascader/src/q-cascader.scss';
@import '~@qvant/qui/src/qComponents/QCheckbox/src/q-checkbox.scss';
@import '~@qvant/qui/src/qComponents/QCol/src/q-col.scss';
@import '~@qvant/qui/src/qComponents/QCollapseItem/src/q-collapse-item.scss';
@import '~@qvant/qui/src/qComponents/QColorPicker/src/q-color-picker.scss';
@import '~@qvant/qui/src/qComponents/QContextMenu/src/q-context-menu.scss';
@import '~@qvant/qui/src/qComponents/QDatePicker/src/q-date-picker.scss';
@import '~@qvant/qui/src/qComponents/QDialog/src/q-dialog.scss';
@import '~@qvant/qui/src/qComponents/QDrawer/src/q-drawer.scss';
@import '~@qvant/qui/src/qComponents/QForm/src/q-form-item.scss';
@import '~@qvant/qui/src/qComponents/QInput/src/q-input.scss';
@import '~@qvant/qui/src/qComponents/QInputNumber/src/q-input-number.scss';
@import '~@qvant/qui/src/qComponents/QMessageBox/src/q-message-box.scss';
@import '~@qvant/qui/src/qComponents/QNotification/src/q-notification.scss';
@import '~@qvant/qui/src/qComponents/QPagination/src/q-pagination.scss';
@import '~@qvant/qui/src/qComponents/QPopover/src/q-popover.scss';
@import '~@qvant/qui/src/qComponents/QRadio/src/q-radio.scss';
@import '~@qvant/qui/src/qComponents/QRadio/src/q-radio-group.scss';
@import '~@qvant/qui/src/qComponents/QRow/src/q-row.scss';
@import '~@qvant/qui/src/qComponents/QScrollbar/src/q-scrollbar.scss';
@import '~@qvant/qui/src/qComponents/QSelect/src/q-select.scss';
@import '~@qvant/qui/src/qComponents/QTabs/src/q-tabs.scss';
@import '~@qvant/qui/src/qComponents/QTabs/src/q-tab-pane.scss';
@import '~@qvant/qui/src/qComponents/QTextarea/src/q-textarea.scss';
@import '~@qvant/qui/src/qComponents/QUpload/src/q-upload.scss';
```

### Fonts

need to set the path for files with statics

```scss
$--base-path: '~@qvant/qui/src';
@import '~@qvant/qui/src/main.scss';
@import '~@qvant/qui/src/fonts/index.scss';
@import '~@qvant/qui/src/icons/index.scss';
@import '~@qvant/qui/src/qStyles/transition.scss';
```
