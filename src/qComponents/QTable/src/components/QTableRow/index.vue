<template>
  <tr
    :class="rowClass"
    :style="getRowStyle"
    @click="rowClick && rowClick(row)"
  >
    <td
      v-if="isSelectable"
      class="q-table__cell q-table__cell_selectable"
      :observer-key="isSelectableColumnSticked && 'q-table-checkboxes'"
      :style="firstTdStyle"
    >
      <div
        v-if="canRowExpand(0)"
        class="q-table__expand-arrow"
        :class="openedTreeClass"
        @click="handleExpandClick"
      >
        <span class="q-icon-triangle-right" />
      </div>
      <q-checkbox v-model="isChecked" />
    </td>
    <td
      v-for="(column, columnIndex) in columns"
      :key="column.key"
      :style="getCellStyle(columnIndex)"
      :align="column.align || 'left'"
      :observer-key="column.sticky ? column.key : null"
      class="q-table__cell"
    >
      <div
        v-if="!isSelectable && canRowExpand(columnIndex)"
        class="q-table__expand-arrow"
        :class="openedTreeClass"
        @click="handleExpandClick"
      >
        <span class="q-icon-triangle-right" />
      </div>

      <div
        v-if="column.customCellClass"
        :class="column.customCellClass"
      >
        <slot
          :row-data="updateRow(row.data, columnIndex, column.key, column)"
          name="row"
        />

        <slot
          v-if="checkLoader(columnIndex)"
          :row-data="row"
          name="loader"
        />
      </div>

      <template v-else>
        <slot
          :row-data="updateRow(row.data, columnIndex, column.key, column)"
          name="row"
        />

        <slot
          v-if="checkLoader(columnIndex)"
          :row-data="row"
          name="loader"
        />
      </template>
    </td>
  </tr>
</template>

<script>
import { get } from 'lodash-es';

export default {
  name: 'QTableRow',

  props: {
    row: {
      type: Object,
      required: true
    },
    rowIndex: {
      type: Number,
      required: true
    },
    columns: {
      type: Array,
      required: true
    },
    childrenKey: {
      type: String,
      default: 'children'
    },
    expandable: {
      type: Boolean,
      default: false
    },
    indent: {
      type: Number,
      default: 0
    },
    indentSize: {
      type: Number,
      default: 16
    },
    pagesInExpand: {
      type: [Boolean, String],
      default: false
    },
    customRowClass: {
      type: Function,
      default: null
    },
    customRowStyle: {
      type: Function,
      default: null
    },
    rowClick: {
      type: Function,
      default: null
    },
    isSelectable: {
      type: Boolean,
      default: false
    },
    isSelectableColumnSticked: {
      type: Boolean,
      default: false
    },
    checkedRows: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      firstTdStyle: ''
    };
  },

  computed: {
    isChecked: {
      get() {
        return this.checkedRows.includes(this.rowIndex);
      },
      set(isChecked) {
        this.$emit('check', {
          isChecked,
          row: this.row,
          rowIndex: this.rowIndex
        });
      }
    },
    rowClass() {
      const rowClass = {};

      if (this.customRowClass) {
        const newClass = this.customRowClass({
          row: this.row,
          rowIndex: this.rowIndex
        });

        rowClass[newClass] = true;
      }

      if (this.getRowStyle) {
        rowClass['custom-border'] = Boolean(this.customRowStyle);
      }

      if (this.rowClick) {
        const newClass = 'q-table__row_is-interactive';

        rowClass[newClass] = true;
      }

      if (!this.indent) return rowClass;

      rowClass[`q-table__row-level-${this.indent / this.indentSize}`] = true;

      return rowClass;
    },
    openedTreeClass() {
      return this.row.isTreeOpened ? 'q-table__expand-arrow_opened' : '';
    },
    getRowStyle() {
      return (
        this.customRowStyle &&
        this.customRowStyle({
          row: this.row,
          rowIndex: this.rowIndex
        })
      );
    }
  },

  mounted() {
    this.getFirstTdStyle();
  },

  methods: {
    checkLoader(columnIndex) {
      return this.row[this.pagesInExpand] && !columnIndex;
    },
    canRowExpand(columnIndex) {
      return (
        this.expandable &&
        columnIndex === 0 &&
        Boolean(this.row.data[this.childrenKey]?.length)
      );
    },
    handleExpandClick() {
      this.$emit('expand-click', this.row);
    },
    getFirstTdStyle() {
      if (!this.isSelectable || !this.row.data[this.childrenKey]?.length)
        return;

      const elm = this.$el?.querySelector('td:first-child');

      if (!elm || !this.indent) return;

      const paddingLeft = window
        .getComputedStyle(elm)
        .paddingLeft.replace(/\D/g, '');

      this.firstTdStyle = {
        paddingLeft: `${Number(paddingLeft) + this.indent}px`
      };
    },
    getCellStyle(index) {
      const style = {};

      if (!this.indent) return style;

      if (index === 0 && !this.isSelectable && this.$el) {
        const elm = this.$el.querySelector('td:first-child');

        if (elm) {
          const paddingLeft = window
            .getComputedStyle(elm)
            .paddingLeft.replace(/\D/g, '');

          style.paddingLeft = `${Number(paddingLeft) + this.indentSize}px`;
        }
      }

      return style;
    },
    updateRow(row, index, key, column) {
      let value = get(row.data || row, key);

      if (column.formatter) {
        value = column.formatter(value, row, column);
      }

      return {
        key,
        index,
        value,
        indent: this.indent,
        column,
        data: row
      };
    }
  }
};
</script>
