import QSlider from '../../../src/qComponents/QSlider';

import Default from './Default';
import WithoutTooltip from './WithoutTooltip';
import Breakpoints from './Breakpoints';
import Captions from './Captions';
import Range from './Range';
import Disabled from './Disabled';
import Vertical from './Vertical';

export default {
  title: 'Components/QSlider',
  component: QSlider,
  decorators: [
    () => ({
      template: '<div style="width: 80vw;"><story /></div>'
    })
  ]
};

export {
  Default,
  WithoutTooltip,
  Breakpoints,
  Captions,
  Range,
  Disabled,
  Vertical
};
