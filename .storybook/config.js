// eslint-disable-next-line import/no-extraneous-dependencies
import { configure } from '@storybook/vue';

import Vue from 'vue';

import './global/_global.scss';

import ElementUI from 'element-ui';
import lang from 'element-ui/lib/locale/lang/ru-RU';
import locale from 'element-ui/lib/locale';

import '../src/all.scss';

locale.use(lang);
Vue.use(ElementUI);

configure(require.context('./stories', true, /\.stories\.js$/), module);
