// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf, addDecorator } from '@storybook/vue';
// eslint-disable-next-line import/no-extraneous-dependencies
import Centered from '@storybook/addon-centered/vue';

addDecorator(Centered);

// Element UI stories
const requireComponent = require.context('../components', true, /\.vue$/);
const withoutCentered = ['Dialog'];

requireComponent.keys().forEach(fileName => {
  const extractedPath = fileName.match(/\/(.+)\/([\w-]+?(?=\.))/);
  storiesOf(`Components|${extractedPath[1]}`, module).add(
    extractedPath[2],
    () => requireComponent(fileName).default,
    {
      centered: { disable: withoutCentered.includes(extractedPath[1]) }
    }
  );
});

// QComponents stories
const qRequireComponent = require.context('../qComponents', true, /\.vue$/);
const qwithoutCentered = [];

qRequireComponent.keys().forEach(fileName => {
  const extractedPath = fileName.match(/\/(.+)\/([\w-]+?(?=\.))/);
  storiesOf(`Q-components|${extractedPath[1]}`, module).add(
    extractedPath[2],
    () => qRequireComponent(fileName).default,
    {
      centered: { disable: qwithoutCentered.includes(extractedPath[1]) }
    }
  );
});
