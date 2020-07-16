import { storiesOf, addDecorator } from '@storybook/vue';
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
const qStoryComponents = require.context('../qComponents', true, /\.vue$/);
const qComponents = require.context('../../src/qComponents', true, /\.vue$/);
const qwithoutCentered = [];

qStoryComponents.keys().forEach(fileName => {
  const extractedPath = fileName.match(/\/(.+)\/([\w-]+?(?=\.))/);
  const storyComponent = qStoryComponents(fileName).default;
  const component = qComponents(
    `./${extractedPath[1]}/src/${extractedPath[1]}.vue`
  ).default;
  storiesOf(`Q-components|${extractedPath[1]}`, module)
    .addParameters({
      title: extractedPath[1],
      component
    })
    .add(extractedPath[2], () => storyComponent, {
      centered: { disable: qwithoutCentered.includes(extractedPath[1]) }
    });
});
