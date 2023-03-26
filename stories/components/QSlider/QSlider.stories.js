import QSlider from '../../../src/qComponents/QSlider';

import Default from './Default';
import WithoutTooltip from './WithoutTooltip';
import Breakpoints from './Breakpoints';
import Captions from './Captions';
import Range from './Range';
import Disabled from './Disabled';
import Vertical from './Vertical';
import DateType from './DateType';

export default {
  title: 'Components/QSlider',
  component: QSlider,
  decorators: [
    () => ({
      template: '<div style="width: 80vw;"><story /></div>'
    })
  ],
  argTypes: {
    type: { control: { type: 'none' } }
  }
};

export {
  Default,
  WithoutTooltip,
  Breakpoints,
  Captions,
  Range,
  Disabled,
  Vertical,
  DateType
};
