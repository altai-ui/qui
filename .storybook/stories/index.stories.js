// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf, addDecorator } from '@storybook/vue';
// eslint-disable-next-line import/no-extraneous-dependencies
import Centered from '@storybook/addon-centered/vue';

addDecorator(Centered);

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
