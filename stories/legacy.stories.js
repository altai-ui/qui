// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from '@storybook/vue';

import Vue from 'vue';

import ElementUI from 'element-ui';
import lang from 'element-ui/lib/locale/lang/ru-RU';
import locale from 'element-ui/lib/locale';

import QComponents from '../src/qComponents';

import './legacy.scss';
import '../src/all.scss';

locale.use(lang);
Vue.use(ElementUI);
Vue.use(QComponents);

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

// QComponents stories
const qStoryComponents = require.context(
  '../.storybook/qComponents',
  true,
  /\.vue$/
);
const qComponent = require.context('../src/qComponents', true, /\.vue$/);

qStoryComponents.keys().forEach(fileName => {
  const extractedPath = fileName.match(/\/(.+)\/([\w-]+?(?=\.))/);
  const storyComponent = qStoryComponents(fileName).default;
  const component = qComponent(
    `./${extractedPath[1]}/src/${extractedPath[1]}.vue`
  ).default;
  storiesOf(`Legacy/QComponents/${extractedPath[1]}`, module)
    .addParameters({
      title: extractedPath[1],
      component
    })
    .add(extractedPath[2], () => storyComponent);
});
