const renderedChilds = ({
  renderContext,
  childrenKey,
  listeners,
  component,
  children,
  props,
  scopedSlots
}) => {
  return children.reduce((acc, row) => {
    const renderingArray = [];

    renderingArray.push(
      renderContext(component, {
        props: {
          ...props,
          indent: row.$indent,
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
        children: row.data[childrenKey]
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

    if (row.data[childrenKey]) {
      const renderedData = {
        renderContext,
        childrenKey,
        component: QTableRow,
        listeners,
        children: row.data[childrenKey],
        props,
        scopedSlots
      };

      if (row.$isTreeOpened) renderingArray.push(renderedChilds(renderedData));
    }

    return [renderContext(QTableRow, { ...data }), ...renderingArray];
  }
});

export default withQTableRow;
