import Vue from 'vue';
import { mount, shallowMount } from '@vue/test-utils';
import Qui from '../../src/qComponents';

Vue.use(Qui);

global.mount = mount;
global.shallowMount = shallowMount;
