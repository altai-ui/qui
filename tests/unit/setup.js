import Vue from 'vue';
import { mount, shallowMount } from '@vue/test-utils';
import { QScrollbar } from '../../src/qComponents';

Vue.use(QScrollbar);

global.mount = mount;
global.shallowMount = shallowMount;
