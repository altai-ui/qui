import QTag from '../../src/qComponents/QTag';

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
    handleCloseClick(clickedTag) {
      console.log('Close tag clicked');
      this.tags = this.tags.filter(tag => tag !== clickedTag);
    }
  },
  template: `
    <div>
      <q-tag
        v-for="tag in tags"
        :key="tag"
        :closable="closable"
        @close="handleCloseClick(tag)"
      >
        {{ tag }}
      </q-tag>
    </div>
  `
});

QTagStory.storyName = 'Default';
