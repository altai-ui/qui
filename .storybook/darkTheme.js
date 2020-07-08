import { create } from '@storybook/theming/create';

export default create({
  brandTitle: 'Qvant Design System',
  brandUrl: '/',
  brandImage: '',

  colorPrimary: '#000',
  colorSecondary: '#2399e6',

  // UI
  appBg: '#373c42',
  appContentBg: '#eee',
  appBorderColor: '#eee',
  appBorderRadius: 8,

  // Typography
  fontBase: '"Open Sans", sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: '#fff',
  textInverseColor: '#fff',

  // Toolbar default and active colors
  barTextColor: '#eee',
  barSelectedColor: '#000',
  barBg: '#777',

  // Form colors
  inputBg: '#fff',
  inputBorder: '#eee',
  inputTextColor: '#000',
  inputBorderRadius: 4
});
