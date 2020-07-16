const path = require('path');

module.exports = {
  stories: ['./stories/index.stories.js'],
  addons: [
    {
      name: '@storybook/addon-docs',
      options: {
        vueDocgenOptions: {
          alias: {
            '@': path.resolve(__dirname, '../')
          }
        }
      }
    }
  ]
};
