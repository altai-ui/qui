# design-system

> inherited by:

- City
- Publisher (SSP)
- DSP

## run sandbox (run here)

```bash
yarn storybook
npm run storybook
```

## install to project (run from project)

```bash
yarn add @qvant/design-system
```

if you get the error "integrity check failure", run it:

```bash
yarn --update-checksums
```

Create .yarnrc or .npmrc in your project's root:

.yarnrc

```text
"@qvant:registry" "http://nexus.mt.ru:8081/repository/qvant/"
```

.npmrc

```text
@qvant:registry=http://nexus.mt.ru:8081/repository/qvant/
```

## Import into Scss

main styles

```scss
@import '~@qvant/design-system/src/main.scss';
```

### Fonts

need to set the path for files with statics

```scss
$--base-path: '~@qvant/design-system/src';
@import '~@qvant/design-system/src/fonts/index.scss';
@import '~@qvant/design-system/src/theme-chalk/icon.scss';
```

components

```scss
@import '~@qvant/design-system/src/theme-chalk/pagination.scss';
@import '~@qvant/design-system/src/theme-chalk/dialog.scss';
@import '~@qvant/design-system/src/theme-chalk/autocomplete.scss';
@import '~@qvant/design-system/src/theme-chalk/dropdown.scss';
@import '~@qvant/design-system/src/theme-chalk/dropdown-menu.scss';
@import '~@qvant/design-system/src/theme-chalk/dropdown-item.scss';
@import '~@qvant/design-system/src/theme-chalk/menu.scss';
@import '~@qvant/design-system/src/theme-chalk/submenu.scss';
@import '~@qvant/design-system/src/theme-chalk/menu-item.scss';
@import '~@qvant/design-system/src/theme-chalk/menu-item-group.scss';
@import '~@qvant/design-system/src/theme-chalk/input.scss';
@import '~@qvant/design-system/src/theme-chalk/input-number.scss';
@import '~@qvant/design-system/src/theme-chalk/radio.scss';
@import '~@qvant/design-system/src/theme-chalk/radio-group.scss';
@import '~@qvant/design-system/src/theme-chalk/radio-button.scss';
@import '~@qvant/design-system/src/theme-chalk/checkbox.scss';
@import '~@qvant/design-system/src/theme-chalk/checkbox-button.scss';
@import '~@qvant/design-system/src/theme-chalk/checkbox-group.scss';
@import '~@qvant/design-system/src/theme-chalk/switch.scss';
@import '~@qvant/design-system/src/theme-chalk/select.scss';
@import '~@qvant/design-system/src/theme-chalk/button.scss';
@import '~@qvant/design-system/src/theme-chalk/button-group.scss';
@import '~@qvant/design-system/src/theme-chalk/table.scss';
@import '~@qvant/design-system/src/theme-chalk/table-column.scss';
@import '~@qvant/design-system/src/theme-chalk/date-picker.scss';
@import '~@qvant/design-system/src/theme-chalk/time-select.scss';
@import '~@qvant/design-system/src/theme-chalk/time-picker.scss';
@import '~@qvant/design-system/src/theme-chalk/popover.scss';
@import '~@qvant/design-system/src/theme-chalk/tooltip.scss';
@import '~@qvant/design-system/src/theme-chalk/message-box.scss';
@import '~@qvant/design-system/src/theme-chalk/breadcrumb.scss';
@import '~@qvant/design-system/src/theme-chalk/breadcrumb-item.scss';
@import '~@qvant/design-system/src/theme-chalk/form.scss';
@import '~@qvant/design-system/src/theme-chalk/form-item.scss';
@import '~@qvant/design-system/src/theme-chalk/tabs.scss';
@import '~@qvant/design-system/src/theme-chalk/tab-pane.scss';
@import '~@qvant/design-system/src/theme-chalk/tag.scss';
@import '~@qvant/design-system/src/theme-chalk/tree.scss';
@import '~@qvant/design-system/src/theme-chalk/alert.scss';
@import '~@qvant/design-system/src/theme-chalk/notification.scss';
@import '~@qvant/design-system/src/theme-chalk/slider.scss';
@import '~@qvant/design-system/src/theme-chalk/loading.scss';
@import '~@qvant/design-system/src/theme-chalk/row.scss';
@import '~@qvant/design-system/src/theme-chalk/col.scss';
@import '~@qvant/design-system/src/theme-chalk/upload.scss';
@import '~@qvant/design-system/src/theme-chalk/progress.scss';
@import '~@qvant/design-system/src/theme-chalk/spinner.scss';
@import '~@qvant/design-system/src/theme-chalk/message.scss';
@import '~@qvant/design-system/src/theme-chalk/badge.scss';
@import '~@qvant/design-system/src/theme-chalk/card.scss';
@import '~@qvant/design-system/src/theme-chalk/rate.scss';
@import '~@qvant/design-system/src/theme-chalk/steps.scss';
@import '~@qvant/design-system/src/theme-chalk/step.scss';
@import '~@qvant/design-system/src/theme-chalk/carousel.scss';
@import '~@qvant/design-system/src/theme-chalk/scrollbar.scss';
@import '~@qvant/design-system/src/theme-chalk/carousel-item.scss';
@import '~@qvant/design-system/src/theme-chalk/collapse.scss';
@import '~@qvant/design-system/src/theme-chalk/collapse-item.scss';
@import '~@qvant/design-system/src/theme-chalk/cascader.scss';
@import '~@qvant/design-system/src/theme-chalk/color-picker.scss';
@import '~@qvant/design-system/src/theme-chalk/transfer.scss';
@import '~@qvant/design-system/src/theme-chalk/container.scss';
@import '~@qvant/design-system/src/theme-chalk/header.scss';
@import '~@qvant/design-system/src/theme-chalk/aside.scss';
@import '~@qvant/design-system/src/theme-chalk/main.scss';
@import '~@qvant/design-system/src/theme-chalk/footer.scss';
@import '~@qvant/design-system/src/theme-chalk/cascader-panel.scss';
```
