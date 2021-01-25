<p align="center">
  <img src="/.readme-assets/qui-logo.svg?raw=true" />
</p>

<p align="center" class="unchanged rich-diff-level-one">
<!--BADGES-->
<span class="badge-shields"><a href="https://qvant-lab.github.io/qui" title="storybook"><img src="https://img.shields.io/badge/storybook-yes-green.svg" alt="storybook" /></a></span> <span class="badge-shields"><img src="https://img.shields.io/badge/responsive-yes-green.svg" /></span> <span class="badge-npmversion"><a href="https://npmjs.org/package/@qvant/qui" title="View this project on NPM"><img src="https://img.shields.io/npm/v/@qvant/qui.svg" alt="NPM version" /></a></span> <span class="badge-npmdownloads"><a href="https://npmjs.org/package/@qvant/qui" title="View this project on NPM"><img src="https://img.shields.io/npm/dm/@qvant/qui.svg" alt="NPM downloads" /></a></span></br><span class="badge-daviddm"><a href="https://david-dm.org/Qvant-lab/qui" title="View the status of this project's dependencies on DavidDM"><img src="https://img.shields.io/david/Qvant-lab/qui.svg" alt="Dependency Status" /></a></span> <span class="badge-daviddmdev"><a href="https://david-dm.org/Qvant-lab/qui#info=devDependencies" title="View the status of this project's development dependencies on DavidDM"><img src="https://img.shields.io/david/dev/Qvant-lab/qui.svg" alt="Dev Dependency Status" /></a></span><!--/BADGES--></p>

# A Vue.js Design System for Web.

Responsive, user-friendly and lightweight library helping us build great products for our customers. This library for Vue 2.x, Qui for Vue 3 in our roadmap

[Storybook (live demo)](https://qvant-lab.github.io/qui/)

What is it?

- 🔩 30+ Vue components
- 📦 icons pack
- 🏳️‍🌈 colors & grid
- 🥷 neumorphism styles
- 📚 storybook sandbox

Some examples below:

![buttons](/.readme-assets/buttons.jpg?raw=true)
![inputs](/.readme-assets/inputs.gif?raw=true)
![icons](/.readme-assets/icons.gif?raw=true)
![tables](/.readme-assets/tables.jpg?raw=true)
![datepicker](/.readme-assets/datepicker.jpg?raw=true)
![other](/.readme-assets/other.jpg?raw=true)

## Install

```bash
npm install @qvant/qui -S
yarn add @qvant/qui
```

You can import Qui entirely, or just import what you need. Let's start with fully import.

## Quick setup

In main.js:

```js
import Vue from 'vue';
import Qui from '@qvant/qui';
import '@qvant/qui/dist/qui.css';

// Setup all components
Vue.use(Qui);
// that's it! All components will be imported with styles
```

in YourComponent.vue: (Example)

```vue
<template>
  <q-input v-model="value" />
</template>
<script>
export default {
  data() {
    return {
      value: ''
    };
  },
  mounted() {
    // the modals have shortcuts in your components:
    this.$notify({ ... }) // calls QNotification
    this.$message({ ... }) // calls QMessageBox
    this.$dialog({ ... }) // calls QDialog
  }
};
</script>
```

...or configure quick setup

In main.js:

```js
import Vue from 'vue';
import Qui from '@qvant/qui';
import '@qvant/qui/dist/qui.css';

Vue.use(Qui, {
  localization: {
    locale: 'en', // Russian language by default, you can set `en` for English
    customI18nMessages: {
      // rewrite default texts, see the source: src/qComponents/constants/locales
      en: {
        QDatepicker: {
          placeholder: 'Pick your birthday!'
        }
      }
    },
    zIndexCounter: 3000, // zIndexCounter is being used by some components, (e.g QPopover, QSelect, QDialog ...etc), 2000 by default
    prefix: 'yo' // you can change component's prefix, e.g. must be used <yo-input /> instead of <q-input />
  }
});
```

in YourComponent.vue: (Example)

```vue
<template>
  <!-- placeholder is changed on 'Pick your birthday!' -->
  <yo-datepicker v-model="value" type="date" />
</template>
<script>
export default {
  data() {
    return {
      value: null
    };
  }
};
</script>
```

Now you have implemented Vue and Qui to your project, and it's time to write your code.
Please refer to each component's [Stories](https://qvant-lab.github.io/qui/) to learn how to use them.

## Not quick setup

If you have a module bundler (e.g webpack), you can import components separately and take care about your bundle size

In main.js:

```js
// import the main plugin from another place (it ensures Qui will be installed without any components, but instance will set required properties and directives)
import Qui from '@qvant/qui/src/onDemand';

// import the component you want
import QButton from '@qvant/qui/src/qComponents/QButton';
// ...or in async way
Vue.component('q-button', () =>
  import(/* webpackChunkName: "qui" */ '@qvant/qui/src/qComponents/QButton')
);

// init
Vue.use(Qui);
Vue.use(QButton);
```

In main.scss:

```scss
// need to set the path for files with statics
$--base-path: '~@qvant/qui/src';
// set main styles
@import '~@qvant/qui/src/main.scss';
// notice that you must use `fonts` and `icons` styles for some of components:
@import '~@qvant/qui/src/fonts/index.scss';
@import '~@qvant/qui/src/icons/index.scss';
```

import all styles:

```scss
@import '~@qvant/qui/src/components.scss';
```

...or components separately:

```scss
@import '~@qvant/qui/src/qComponents/QBreadcrumbs/src/q-breadcrumbs.scss';
@import '~@qvant/qui/src/qComponents/QButton/src/q-button.scss';
// ...etc
```

## Optional

- if you want use modals inside your components as property of 'this':

```js
import { QMessageBox, QDialog, QNotification } from '@qvant/qui';
// or import separately
import QMessageBox from '@qvant/qui/src/qComponents/QMessageBox';
import QDialog from '@qvant/qui/src/qComponents/QDialog';
import QNotification from '@qvant/qui/src/qComponents/QNotification';

Vue.prototype.$message = QMessageBox;
Vue.prototype.$dialog = QDialog;
Vue.prototype.$notify = options =>
  QNotification({
    duration: 3000, // - ms
    ...options
  });
```

- if you use VueI18n, you need to merge messages:

```js
import VueI18n from 'vue-i18n';
import { en, ru } from '@qvant/qui/src/qComponents/constants/locales';

Vue.use(VueI18n);

const messages = {
  en: {
    message: {
      hello: 'hello world'
    },
    ...en
  },
  ru: {
    message: {
      hello: 'привет, мир'
    },
    ...ru
  }
};

const i18n = new VueI18n({
  locale: 'en',
  messages
});

new Vue({
  i18n
}).$mount('#your-app');
```

## Supported languages

- Russian ✅
- English ✅
- Also you can use any language by setting texts for components via Vue I18n (https://kazupon.github.io/vue-i18n/)

## Browser Support

Modern browsers are recomended

- safari: >11
- chrome: >=61
- firefox: >=58
- opera: >=62
- edge: >=16
- yandex: >=18
- ie: ? (we don't know :) and will not support it)

## Development

Clone repository and run storybook

```bash
yarn storybook
npm run storybook
```

## LICENSE

MIT
