const renderedChilds = ({
  renderContext,
  childrenKey,
  listeners,
  component,
  childrens,
  props,
  scopedSlots
}) => {
  return childrens.reduce((acc, row) => {
    const renderingArray = [];

    renderingArray.push(
      renderContext(component, {
        props: {
          ...props,
          indent: row.indent,
          row
        },
        on: { ...listeners },
        scopedSlots
      })
    );

    if (row[childrenKey]) {
      const renderedData = {
        renderContext,
        childrenKey,
        component,
        listeners,
        props,
        scopedSlots,
        childrens: row[childrenKey]
      };

      renderingArray.push(renderedChilds(renderedData));
    }

    return [...acc, ...renderingArray];
  }, []);
};

const withQTableRow = QTableRow => ({
  functional: true,

  name: 'withQTableRow',

  render(renderContext, context) {
    const { props, listeners, scopedSlots, data } = context;
    const { childrenKey, row } = props;

    const renderingArray = [];

    if (row[childrenKey]) {
      const renderedData = {
        renderContext,
        childrenKey,
        component: QTableRow,
        listeners,
        childrens: row[childrenKey],
        props,
        scopedSlots
      };
      renderingArray.push(renderedChilds(renderedData));
    }

    return [renderContext(QTableRow, { ...data }), ...renderingArray];
  }
});

export default withQTableRow;
