import QSelect from '../../../src/qComponents/QSelect';
import QOption from '../../../src/qComponents/QOption';

import Default from './Default';
import Multiple from './Multiple';

export default {
  title: 'Components/QSelect',
  component: QSelect,
  subcomponents: { QOption },
  argTypes: {
    value: { control: { type: 'none' } }
  }
};

export { Default, Multiple };
