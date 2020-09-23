import '../../src/qComponents/QPagination/src/q-pagination.scss';
import QPagination from '../../src/qComponents/QPagination';

export default {
  title: 'Components/QPagination',
  component: QPagination
};

export const QPaginationStory = (_, { argTypes }) => ({
  components: { QPagination },
  props: Object.keys(argTypes),
  template: `
    <q-pagination
      :pageCount="pageCount"
      :total="total"
      :pageSize="pageSize"
      :currentPage="currentPage"
      :disabled="disabled"
      :pagerCount="pagerCount"
    />
  `
});

QPaginationStory.storyName = 'Default';
QPaginationStory.args = {
  pageCount: 32,
  currentPage: 4
};
