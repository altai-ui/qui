import QUpload from '../../../src/qComponents/QUpload';

import Default from './Default';
import Multiple from './Multiple';

export default {
  title: 'Components/QUpload',
  component: QUpload,
  argTypes: {
    'v-model': { control: { type: 'none' } }
  }
};

export { Default, Multiple };
