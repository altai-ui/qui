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
@import '~@qvant/design-system/src/neumorphism/icon.scss';
```

components

```scss
@import '~@qvant/design-system/src/neumorphism/pagination.scss';
@import '~@qvant/design-system/src/neumorphism/dialog.scss';
@import '~@qvant/design-system/src/neumorphism/autocomplete.scss';
@import '~@qvant/design-system/src/neumorphism/dropdown.scss';
@import '~@qvant/design-system/src/neumorphism/dropdown-menu.scss';
@import '~@qvant/design-system/src/neumorphism/dropdown-item.scss';
@import '~@qvant/design-system/src/neumorphism/menu.scss';
@import '~@qvant/design-system/src/neumorphism/submenu.scss';
@import '~@qvant/design-system/src/neumorphism/menu-item.scss';
@import '~@qvant/design-system/src/neumorphism/menu-item-group.scss';
@import '~@qvant/design-system/src/neumorphism/input.scss';
@import '~@qvant/design-system/src/neumorphism/input-number.scss';
@import '~@qvant/design-system/src/neumorphism/radio.scss';
@import '~@qvant/design-system/src/neumorphism/radio-group.scss';
@import '~@qvant/design-system/src/neumorphism/radio-button.scss';
@import '~@qvant/design-system/src/neumorphism/checkbox.scss';
@import '~@qvant/design-system/src/neumorphism/switch.scss';
@import '~@qvant/design-system/src/neumorphism/select.scss';
@import '~@qvant/design-system/src/neumorphism/button.scss';
@import '~@qvant/design-system/src/neumorphism/button-group.scss';
@import '~@qvant/design-system/src/neumorphism/table.scss';
@import '~@qvant/design-system/src/neumorphism/table-column.scss';
@import '~@qvant/design-system/src/neumorphism/date-picker.scss';
@import '~@qvant/design-system/src/neumorphism/time-select.scss';
@import '~@qvant/design-system/src/neumorphism/time-picker.scss';
@import '~@qvant/design-system/src/neumorphism/popover.scss';
@import '~@qvant/design-system/src/neumorphism/tooltip.scss';
@import '~@qvant/design-system/src/neumorphism/message-box.scss';
@import '~@qvant/design-system/src/neumorphism/breadcrumb.scss';
@import '~@qvant/design-system/src/neumorphism/breadcrumb-item.scss';
@import '~@qvant/design-system/src/neumorphism/form.scss';
@import '~@qvant/design-system/src/neumorphism/form-item.scss';
@import '~@qvant/design-system/src/neumorphism/tabs.scss';
@import '~@qvant/design-system/src/neumorphism/tag.scss';
@import '~@qvant/design-system/src/neumorphism/tree.scss';
@import '~@qvant/design-system/src/neumorphism/alert.scss';
@import '~@qvant/design-system/src/neumorphism/notification.scss';
@import '~@qvant/design-system/src/neumorphism/slider.scss';
@import '~@qvant/design-system/src/neumorphism/loading.scss';
@import '~@qvant/design-system/src/neumorphism/row.scss';
@import '~@qvant/design-system/src/neumorphism/col.scss';
@import '~@qvant/design-system/src/neumorphism/upload.scss';
@import '~@qvant/design-system/src/neumorphism/progress.scss';
@import '~@qvant/design-system/src/neumorphism/spinner.scss';
@import '~@qvant/design-system/src/neumorphism/message.scss';
@import '~@qvant/design-system/src/neumorphism/badge.scss';
@import '~@qvant/design-system/src/neumorphism/card.scss';
@import '~@qvant/design-system/src/neumorphism/rate.scss';
@import '~@qvant/design-system/src/neumorphism/steps.scss';
@import '~@qvant/design-system/src/neumorphism/step.scss';
@import '~@qvant/design-system/src/neumorphism/carousel.scss';
@import '~@qvant/design-system/src/neumorphism/scrollbar.scss';
@import '~@qvant/design-system/src/neumorphism/carousel-item.scss';
@import '~@qvant/design-system/src/neumorphism/collapse.scss';
@import '~@qvant/design-system/src/neumorphism/collapse-item.scss';
@import '~@qvant/design-system/src/neumorphism/cascader.scss';
@import '~@qvant/design-system/src/neumorphism/color-picker.scss';
@import '~@qvant/design-system/src/neumorphism/transfer.scss';
@import '~@qvant/design-system/src/neumorphism/container.scss';
@import '~@qvant/design-system/src/neumorphism/header.scss';
@import '~@qvant/design-system/src/neumorphism/aside.scss';
@import '~@qvant/design-system/src/neumorphism/main.scss';
@import '~@qvant/design-system/src/neumorphism/footer.scss';
@import '~@qvant/design-system/src/neumorphism/cascader-panel.scss';
```
