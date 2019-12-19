# design-system
> inherited by:
- City
- Publisher


### run sandbox (run here)
```
yarn storybook
npm run storybook
```

### install to project (run from project)

```bash
yarn add @qvant/design-system
```
 
if you get the error "integrity check failure", run it:
```
yarn --update-checksums
```

Create .yarnrc or .npmrc in your project's root:

.yarnrc
```
"@qvant:registry" "http://nexus.mt.ru:8081/repository/qvant/"
```
.npmrc
```
@qvant:registry=http://nexus.mt.ru:8081/repository/qvant/
```

### import into Scss

main styles
```scss
@import '~@qvant/design-system/src/main.scss';
```

components
```scss
@import "~@qvant/design-system/src/components/pagination.scss";
@import "~@qvant/design-system/src/components/dialog.scss";
@import "~@qvant/design-system/src/components/autocomplete.scss";
@import "~@qvant/design-system/src/components/dropdown.scss";
@import "~@qvant/design-system/src/components/dropdown-menu.scss";
@import "~@qvant/design-system/src/components/dropdown-item.scss";
@import "~@qvant/design-system/src/components/menu.scss";
@import "~@qvant/design-system/src/components/submenu.scss";
@import "~@qvant/design-system/src/components/menu-item.scss";
@import "~@qvant/design-system/src/components/menu-item-group.scss";
@import "~@qvant/design-system/src/components/input.scss";
@import "~@qvant/design-system/src/components/input-number.scss";
@import "~@qvant/design-system/src/components/radio.scss";
@import "~@qvant/design-system/src/components/radio-group.scss";
@import "~@qvant/design-system/src/components/radio-button.scss";
@import "~@qvant/design-system/src/components/checkbox.scss";
@import "~@qvant/design-system/src/components/checkbox-button.scss";
@import "~@qvant/design-system/src/components/checkbox-group.scss";
@import "~@qvant/design-system/src/components/switch.scss";
@import "~@qvant/design-system/src/components/select.scss";
@import "~@qvant/design-system/src/components/button.scss";
@import "~@qvant/design-system/src/components/button-group.scss";
@import "~@qvant/design-system/src/components/table.scss";
@import "~@qvant/design-system/src/components/table-column.scss";
@import "~@qvant/design-system/src/components/date-picker.scss";
@import "~@qvant/design-system/src/components/time-select.scss";
@import "~@qvant/design-system/src/components/time-picker.scss";
@import "~@qvant/design-system/src/components/popover.scss";
@import "~@qvant/design-system/src/components/tooltip.scss";
@import "~@qvant/design-system/src/components/message-box.scss";
@import "~@qvant/design-system/src/components/breadcrumb.scss";
@import "~@qvant/design-system/src/components/breadcrumb-item.scss";
@import "~@qvant/design-system/src/components/form.scss";
@import "~@qvant/design-system/src/components/form-item.scss";
@import "~@qvant/design-system/src/components/tabs.scss";
@import "~@qvant/design-system/src/components/tab-pane.scss";
@import "~@qvant/design-system/src/components/tag.scss";
@import "~@qvant/design-system/src/components/tree.scss";
@import "~@qvant/design-system/src/components/alert.scss";
@import "~@qvant/design-system/src/components/notification.scss";
@import "~@qvant/design-system/src/components/slider.scss";
@import "~@qvant/design-system/src/components/loading.scss";
@import "~@qvant/design-system/src/components/row.scss";
@import "~@qvant/design-system/src/components/col.scss";
@import "~@qvant/design-system/src/components/upload.scss";
@import "~@qvant/design-system/src/components/progress.scss";
@import "~@qvant/design-system/src/components/spinner.scss";
@import "~@qvant/design-system/src/components/message.scss";
@import "~@qvant/design-system/src/components/badge.scss";
@import "~@qvant/design-system/src/components/card.scss";
@import "~@qvant/design-system/src/components/rate.scss";
@import "~@qvant/design-system/src/components/steps.scss";
@import "~@qvant/design-system/src/components/step.scss";
@import "~@qvant/design-system/src/components/carousel.scss";
@import "~@qvant/design-system/src/components/scrollbar.scss";
@import "~@qvant/design-system/src/components/carousel-item.scss";
@import "~@qvant/design-system/src/components/collapse.scss";
@import "~@qvant/design-system/src/components/collapse-item.scss";
@import "~@qvant/design-system/src/components/cascader.scss";
@import "~@qvant/design-system/src/components/color-picker.scss";
@import "~@qvant/design-system/src/components/transfer.scss";
@import "~@qvant/design-system/src/components/container.scss";
@import "~@qvant/design-system/src/components/header.scss";
@import "~@qvant/design-system/src/components/aside.scss";
@import "~@qvant/design-system/src/components/main.scss";
@import "~@qvant/design-system/src/components/footer.scss";
@import "~@qvant/design-system/src/components/cascader-panel.scss";
```
