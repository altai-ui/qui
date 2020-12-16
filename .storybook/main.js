module.exports = {
  stories: ['../stories/**/**/*.stories.@(ts|js|mdx)'],
  logLevel: 'debug',
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-controls',
    '@storybook/addon-storysource',
    '@storybook/preset-scss',
    '@storybook/addon-toolbars'
  ]
};
