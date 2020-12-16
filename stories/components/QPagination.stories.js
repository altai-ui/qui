import QPagination from '../../src/qComponents/QPagination';

export default {
  title: 'Components/QPagination',
  component: QPagination
};

export const QPaginationStory = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val;
    }
  },
  template: `
    <q-pagination
      :pageCount="pageCount"
      :total="total"
      :pageSize="pageSize"
      :currentPage="currentPage"
      :disabled="disabled"
      :pagerCount="pagerCount"
      @current-change="handleCurrentChange"
    />
  `
});

QPaginationStory.storyName = 'Default';
QPaginationStory.args = {
  pageCount: 30,
  currentPage: 1,
  total: 300,
  pageSize: 10
};
