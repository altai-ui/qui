<template>
  <tr
    :class="rowClass"
    :style="getRowStyle"
    @click="rowClick && rowClick(row)"
  >
    <td
      v-if="selectable"
      class="q-table__cell q-table__cell_selectable"
      :class="{
        'q-table__cell_fixed': fixedColumn.length
      }"
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
      :class="getFixedColumnClass(column.key)"
      :style="getCellStyle(columnIndex)"
      :align="column.align || 'left'"
      class="q-table__cell"
    >
      <div
        v-if="!selectable && canRowExpand(columnIndex)"
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
          :row-data="updateRow(row, columnIndex, column.key, column)"
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
          :row-data="updateRow(row, columnIndex, column.key, column)"
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
    fixedColumn: {
      type: String,
      default: ''
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
    selectable: {
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
      return this.row.$isTreeOpened ? 'q-table__expand-arrow_opened' : '';
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
        Boolean(this.row[this.childrenKey]?.length)
      );
    },
    handleExpandClick() {
      this.$emit('expand-click', this.row);
    },
    getFirstTdStyle() {
      if (!this.selectable || !this.row[this.childrenKey]?.length) return;

      const elm = this.$el?.querySelector('td:first-child');

      if (!elm || !this.indent) return;

      const paddingLeft = window
        .getComputedStyle(elm)
        .paddingLeft.replace(/\D/g, '');

      this.firstTdStyle = {
        paddingLeft: `${Number(paddingLeft) + this.indent}px`
      };
    },
    getCellStyle(columnIndex) {
      const style = {};

      if (
        columnIndex === 0 &&
        !this.selectable &&
        this.$el &&
        this.row[this.childrenKey]?.length
      ) {
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
    getFixedColumnClass(key) {
      return this.fixedColumn && this.fixedColumn === key
        ? 'q-table__cell_fixed'
        : '';
    },
    updateRow(row, index, key, column) {
      let value = row.value ?? get(row, key);

      if (column.formatter) {
        value = column.formatter(value, row, column);
      }

      return {
        ...row,
        $key: key,
        $index: index,
        value,
        indent: this.indent,
        column
      };
    }
  }
};
</script>
