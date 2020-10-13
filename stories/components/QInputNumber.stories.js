import { QInputNumber } from '../../src/qComponents';

export default {
  title: 'Components/QInputNumber',
  component: QInputNumber
};

export const QInputNumberStory = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<q-input-number v-bind="$props" />'
});

QInputNumberStory.storyName = 'Default';
QInputNumberStory.args = {
  value: 32
};
