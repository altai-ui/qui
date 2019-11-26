# theme-city
> Стили MT_CITY 

## Использование

В корне проекта необходимо создать файл .yarnrc или .npmrc и добавить туда запись:

.yarnrc
```
"@mt:registry" "http://nexus.mt.ru:8081/repository/mt-npm/"
```
.npmrc
```
@mt:registry=http://nexus.mt.ru:8081/repository/mt-npm/
```

### Установка пакета

```bash
yarn add @mt/theme-city
```
 
Если при установке возникнет ошибка "integrity check failure", выполнить следующую команду
```
yarn --update-checksums
```

### Import в Scss

Общие стили
```scss
@import '~@mt/theme-city/src/main.scss';
```

Стили компонентов
```scss
@import "~@mt/theme-city/src/components/base.scss";
@import "~@mt/theme-city/src/components/pagination.scss";
@import "~@mt/theme-city/src/components/dialog.scss";
@import "~@mt/theme-city/src/components/autocomplete.scss";
@import "~@mt/theme-city/src/components/dropdown.scss";
@import "~@mt/theme-city/src/components/dropdown-menu.scss";
@import "~@mt/theme-city/src/components/dropdown-item.scss";
@import "~@mt/theme-city/src/components/menu.scss";
@import "~@mt/theme-city/src/components/submenu.scss";
@import "~@mt/theme-city/src/components/menu-item.scss";
@import "~@mt/theme-city/src/components/menu-item-group.scss";
@import "~@mt/theme-city/src/components/input.scss";
@import "~@mt/theme-city/src/components/input-number.scss";
@import "~@mt/theme-city/src/components/radio.scss";
@import "~@mt/theme-city/src/components/radio-group.scss";
@import "~@mt/theme-city/src/components/radio-button.scss";
@import "~@mt/theme-city/src/components/checkbox.scss";
@import "~@mt/theme-city/src/components/checkbox-button.scss";
@import "~@mt/theme-city/src/components/checkbox-group.scss";
@import "~@mt/theme-city/src/components/switch.scss";
@import "~@mt/theme-city/src/components/select.scss";
@import "~@mt/theme-city/src/components/button.scss";
@import "~@mt/theme-city/src/components/button-group.scss";
@import "~@mt/theme-city/src/components/table.scss";
@import "~@mt/theme-city/src/components/table-column.scss";
@import "~@mt/theme-city/src/components/date-picker.scss";
@import "~@mt/theme-city/src/components/time-select.scss";
@import "~@mt/theme-city/src/components/time-picker.scss";
@import "~@mt/theme-city/src/components/popover.scss";
@import "~@mt/theme-city/src/components/tooltip.scss";
@import "~@mt/theme-city/src/components/message-box.scss";
@import "~@mt/theme-city/src/components/breadcrumb.scss";
@import "~@mt/theme-city/src/components/breadcrumb-item.scss";
@import "~@mt/theme-city/src/components/form.scss";
@import "~@mt/theme-city/src/components/form-item.scss";
@import "~@mt/theme-city/src/components/tabs.scss";
@import "~@mt/theme-city/src/components/tab-pane.scss";
@import "~@mt/theme-city/src/components/tag.scss";
@import "~@mt/theme-city/src/components/tree.scss";
@import "~@mt/theme-city/src/components/alert.scss";
@import "~@mt/theme-city/src/components/notification.scss";
@import "~@mt/theme-city/src/components/slider.scss";
@import "~@mt/theme-city/src/components/loading.scss";
@import "~@mt/theme-city/src/components/row.scss";
@import "~@mt/theme-city/src/components/col.scss";
@import "~@mt/theme-city/src/components/upload.scss";
@import "~@mt/theme-city/src/components/progress.scss";
@import "~@mt/theme-city/src/components/spinner.scss";
@import "~@mt/theme-city/src/components/message.scss";
@import "~@mt/theme-city/src/components/badge.scss";
@import "~@mt/theme-city/src/components/card.scss";
@import "~@mt/theme-city/src/components/rate.scss";
@import "~@mt/theme-city/src/components/steps.scss";
@import "~@mt/theme-city/src/components/step.scss";
@import "~@mt/theme-city/src/components/carousel.scss";
@import "~@mt/theme-city/src/components/scrollbar.scss";
@import "~@mt/theme-city/src/components/carousel-item.scss";
@import "~@mt/theme-city/src/components/collapse.scss";
@import "~@mt/theme-city/src/components/collapse-item.scss";
@import "~@mt/theme-city/src/components/cascader.scss";
@import "~@mt/theme-city/src/components/color-picker.scss";
@import "~@mt/theme-city/src/components/transfer.scss";
@import "~@mt/theme-city/src/components/container.scss";
@import "~@mt/theme-city/src/components/header.scss";
@import "~@mt/theme-city/src/components/aside.scss";
@import "~@mt/theme-city/src/components/main.scss";
@import "~@mt/theme-city/src/components/footer.scss";
@import "~@mt/theme-city/src/components/cascader-panel.scss";
```
