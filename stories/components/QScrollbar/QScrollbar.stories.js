import { QScrollbar } from '../../../src/qComponents';
import '../../../src/qComponents/QScrollbar/src/q-scrollbar.scss';
import './q-scrollbar.scss';

export default {
  title: 'Components/QScrollbar',
  component: QScrollbar,
  argTypes: {
    theme: {
      control: { type: 'inline-radio', options: ['primary', 'secondary'] }
    }
  }
};

export const QScrollbarStory = (_, { argTypes }) => ({
  components: { QScrollbar },
  props: Object.keys(argTypes),
  template: `
    <q-scrollbar v-bind="$props">
      <div class="french-bread">
        <p>съешь ещё этих мягких французских булок, да выпей чаю</p>
        <p>съешь ещё этих мягких французских булок, да выпей чаю</p>
        <p>съешь ещё этих мягких французских булок, да выпей чаю</p>
        <p>съешь ещё этих мягких французских булок, да выпей чаю</p>
        <p>съешь ещё этих мягких французских булок, да выпей чаю</p>
        <p>съешь ещё этих мягких французских булок, да выпей чаю</p>
        <p>съешь ещё этих мягких французских булок, да выпей чаю</p>
        <p>съешь ещё этих мягких французских булок, да выпей чаю</p>
        <p>съешь ещё этих мягких французских булок, да выпей чаю</p>
        <p>съешь ещё этих мягких французских булок, да выпей чаю</p>
        <p>съешь ещё этих мягких французских булок, да выпей чаю</p>
        <p>съешь ещё этих мягких французских булок, да выпей чаю</p>
        <p>съешь ещё этих мягких французских булок, да выпей чаю</p>
        <p>съешь ещё этих мягких французских булок, да выпей чаю</p>
        <p>съешь ещё этих мягких французских булок, да выпей чаю</p>
      </div>
    </q-scrollbar>
  `
});

QScrollbarStory.storyName = 'Default';
QScrollbarStory.args = {
  wrapClass: 'scrollbar__wrap'
};
