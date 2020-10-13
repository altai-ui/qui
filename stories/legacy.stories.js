// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from '@storybook/vue';

import Vue from 'vue';

import ElementUI from 'element-ui';
import lang from 'element-ui/lib/locale/lang/ru-RU';
import locale from 'element-ui/lib/locale';

import './legacy.scss';
import '../src/neumorphism/index.scss';

locale.use(lang);
Vue.use(ElementUI);

// Element UI stories
const requireComponent = require.context(
  '../.storybook/components',
  true,
  /\.vue$/
);

requireComponent.keys().forEach(fileName => {
  const extractedPath = fileName.match(/\/(.+)\/([\w-]+?(?=\.))/);
  storiesOf(`Legacy/ElComponents/${extractedPath[1]}`, module).add(
    extractedPath[2],
    () => requireComponent(fileName).default
  );
});
