import { QTag } from '../../src/qComponents';

export default {
  title: 'Components/QTag',
  component: QTag
};

export const QTagStory = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  data() {
    return {
      tags: ['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4', 'Tag 5']
    };
  },
  methods: {
    handleCloseClick() {
      console.log('Close tag clicked');
    }
  },
  template: `
    <div>
      <q-tag
        v-for="tag in tags"
        :key="tag"
        :closable="closable"
        @close="handleCloseClick"
      >
        {{ tag }}
      </q-tag>
    </div>
  `
});

QTagStory.storyName = 'Default';
