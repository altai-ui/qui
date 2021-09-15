import QRangeSelector from '../../../src/qComponents/QRangeSelector';

import Default from './Default';
import WithoutTooltip from './WithoutTooltip';
import Breakpoints from './Breakpoints';
import Captions from './Captions';
import Range from './Range';
import Disabled from './Disabled';
import Vertical from './Vertical';

export default {
  title: 'Components/QRangeSelector',
  component: QRangeSelector,

  decorators: [
    () => ({ template: '<div style="width: 80vw;"><story /></div>' })
  ],

  argTypes: {
    min: {
      control: {
        type: 'number'
      }
    },

    max: {
      control: {
        type: 'number'
      }
    },

    step: {
      control: {
        type: 'number'
      }
    }
  }
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
