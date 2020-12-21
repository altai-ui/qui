import Template from './Default';

const Multiple = Template.bind({});

Multiple.args = {
  appendToBody: false,
  multiple: true,
  filterable: true,
  valueKey: 'id',
  allowCreate: false,
  collapseTags: false,
  clearable: true
};

export default Multiple;
