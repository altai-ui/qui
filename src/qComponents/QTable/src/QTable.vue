<template>
  <div class="q-table">
    <div
      v-if="isLeftShadowShown"
      class="q-table__column-shadow q-table__column-shadow_left"
      :style="getColWidth({ key: 'shadow' })"
    />

    <div
      v-if="isRightShadowShown"
      class="q-table__column-shadow"
    />

    <div
      ref="loaderWrapper"
      class="q-table__loading-wrapper"
    >
      <q-scrollbar
        wrap-class="q-table__scroll-wrapper"
        theme="secondary"
      >
        <div
          ref="tableWrapper"
          class="q-table__wrapper"
          :class="wrapperClass"
          :style="loadingWrapperClass"
        >
          <div
            v-if="isLoading || !isLoadingAnimationComplete"
            class="q-table__loader"
            :class="{ 'q-table__loader_is-loading': isLoading }"
          >
            <div class="q-table__loader-circle">
              <div class="q-table__loader-circle_quarter" />
              <div class="q-table__loader-circle_quarter" />
              <div class="q-table__loader-circle_quarter" />
              <div class="q-table__loader-circle_quarter" />
            </div>
          </div>

          <template v-if="draggable">
            <div class="dnd-handler" />
            <div class="dnd-separator" />
          </template>

          <table
            v-if="rows.length"
            ref="QTable"
            class="q-table__table"
            :class="tableClasses"
            cellspacing="0"
            cellpadding="0"
          >
            <colgroup v-if="fixedLayout">
              <col
                v-if="selectable"
                width="64"
              />
              <col
                v-for="(column, index) in columns"
                :key="index"
                :style="getColWidth(column)"
              />
            </colgroup>

            <thead>
              <tr>
                <th
                  v-if="selectable"
                  class="q-table__header-cell q-table__header-cell__checkbox"
                  :class="{
                    'q-table__cell_fixed': fixedColumn.length
                  }"
                >
                  <q-checkbox
                    v-if="totalCheckboxPosition === 'header'"
                    v-model="areAllChecked"
                    :indeterminate="isIndeterminate"
                  />
                </th>
                <th
                  v-for="(column, index) in columns"
                  :key="index"
                  :class="getCellClasses(column)"
                  :style="getHeaderCellStyle(column.group)"
                  class="q-table__header-cell"
                >
                  <div class="q-table__header-cell-wrapper">
                    <div
                      class="q-table__header-cell-content"
                      @click="handleHeaderClick(column)"
                    >
                      <slot
                        v-if="$scopedSlots.header"
                        name="header"
                        :column="updateItem(column, index, column.key)"
                      />

                      <slot
                        v-else-if="column.slots && column.slots.header"
                        :name="column.slots.header"
                        :column="updateItem(column, index, column.key)"
                      />

                      <template v-else>
                        {{ column.value }}
                      </template>

                      <span
                        v-if="column.sortable"
                        class="q-table__sort-arrow"
                        :class="{
                          'q-icon-arrow-up': sort.direction !== 'descending',
                          'q-icon-arrow-down': sort.direction === 'descending'
                        }"
                      />
                    </div>

                    <template v-if="draggable">
                      <div
                        class="drop-handler dnd-before"
                        :class="getHandlerClass(column.group)"
                        :dndidx="index"
                      />

                      <drag-elements
                        :col-index="index"
                        parent-selector=".q-table__scroll-wrapper"
                        dummy-selector=".dnd-handler"
                        separator-selector=".dnd-separator"
                        target-selector=".q-table__header-cell"
                        limit-box-selector=".q-table__table"
                        :drop-zone-selector="
                          `.${getHandlerClass(column.group)}`
                        "
                        :is-first-blocked="selectable"
                        @change-order="changeColumnsOrder"
                      >
                        <div class="drag-n-drop-icon">
                          <span
                            v-if="draggable"
                            class="q-icon-drag-linear"
                          />
                        </div>
                      </drag-elements>

                      <div
                        class="drop-handler dnd-after"
                        :class="getHandlerClass(column.group)"
                        :dndidx="index + 1"
                      />
                    </template>
                  </div>
                </th>
              </tr>
            </thead>

            <tbody>
              <tr v-if="isTotalExist">
                <th
                  v-if="selectable"
                  class="q-table__total-cell"
                  :class="{
                    'q-table__total-cell_selectable':
                      totalCheckboxPosition === 'total',
                    'q-table__cell_fixed': fixedColumn.length
                  }"
                >
                  <q-checkbox
                    v-if="totalCheckboxPosition === 'total'"
                    v-model="areAllChecked"
                    :indeterminate="isIndeterminate"
                  />
                </th>
                <td
                  v-for="(column, index) in columns"
                  :key="index"
                  :class="getCellClasses(column)"
                  class="q-table__cell q-table__total-cell"
                >
                  <slot
                    v-if="$scopedSlots.total"
                    name="total"
                    :total="updateItem(total, index, column.key)"
                  />

                  <slot
                    v-else-if="column.slots && column.slots.total"
                    :name="column.slots.total"
                    :total="updateItem(total, index, column.key)"
                  />

                  <template v-else-if="total[column.key]">
                    {{ total[column.key] }}
                  </template>
                </td>
              </tr>

              <row-hoc
                v-for="(row, rowIndex) in computedRows"
                :key="rowIndex"
                :row="row"
                :row-index="rowIndex"
                :columns="columns"
                :class="levelClass(row.indent)"
                :fixed-column="fixedColumn"
                :expandable="expandable"
                :indent-size="indentSize"
                :indent="row.indent"
                :children-key="childrenKey"
                :pages-in-expand="pagesInExpand"
                :custom-row-class="customRowClass"
                :custom-row-style="customRowStyle"
                :checked-rows="checkedRows"
                :selectable="selectable"
                :row-click="$listeners['row-click'] && handleRowClick"
                @expand-click="handleExpandClick"
                @check="handleRowCheck"
              >
                <template #row="{ rowData }">
                  <slot
                    v-if="$scopedSlots.row"
                    name="row"
                    :row="rowData"
                  />

                  <slot
                    v-else-if="findSlotForRow(rowData.$key)"
                    :name="findSlotForRow(rowData.$key)"
                    :row="rowData"
                  />

                  <template v-else>
                    {{ rowData.$value }}
                  </template>
                </template>
              </row-hoc>
            </tbody>
          </table>

          <div
            v-else
            class="q-table__empty"
          >
            <div class="q-table__empty-image" />
            <div class="q-table__empty-text">
              {{ emptyText || $t('QTable.noData') }}
            </div>
          </div>
        </div>
      </q-scrollbar>
    </div>
  </div>
</template>

<script>
import QTableRow from './components/QTableRow';
import DragElements from './components/DragElements';

import withQTableRow from './hocs/withQTableRow';

const RowHoc = withQTableRow(QTableRow);
const shadowDropOffset = 3;
const MIN_BLANK_TABLE_HEIGHT = 228;

export default {
  name: 'QTable',

  components: {
    RowHoc,
    DragElements
  },

  props: {
    /**
     * Whether to spread columns proportionally to the table\'s width
     */
    fixedLayout: {
      type: Boolean,
      default: true
    },
    /**
     * Default columns width, required `fixedLayout: true`
     */
    defaultColWidth: {
      type: String,
      default: '200px'
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    /**
     * Array of objects, each object must contain `key` and `value`.
     * Can be extended by `sortable`, `slots`, `width` (works with `fixedLayout: true`)
     * and `type` (if `isSeparated` flag is `true`)
     */
    columns: {
      type: Array,
      required: true
    },
    /**
     * Array of objects, each object must contain `[column.key]: value` pair
     */
    rows: {
      type: Array,
      required: true
    },
    /**
     * Show/hide grid view
     */
    grid: {
      type: Boolean,
      default: false
    },
    /**
     * Whether delimit table by types, required `group` prop in columns
     */
    isSeparated: {
      type: Boolean,
      default: false
    },
    /**
     * Object with `key: color` for each of separated groups
     */
    groupsColors: {
      type: Object,
      default: null
    },
    /**
     * Object, `[column.key]: value` pair, not all are required
     */
    total: {
      type: Object,
      default: () => ({})
    },
    /**
     * Key of column to fix
     */
    fixedColumn: {
      type: String,
      default: ''
    },
    childrenKey: {
      type: String,
      default: 'children'
    },
    /**
     * Width of fixed column. If `fixedLayout: true`, width is equal to `defaultColWidth` prop.
     */
    fixedColumnWidth: {
      type: String,
      default: null
    },
    expandable: {
      type: Boolean,
      default: false
    },
    indentSize: {
      type: Number,
      default: 16
    },
    uniqueKey: {
      type: String,
      default: ''
    },
    /**
     * Where total checkbox need to place, `header` or `total`
     */
    totalCheckboxPosition: {
      type: String,
      default: 'header',
      validator: value => ['header', 'total'].includes(value)
    },
    pagesInExpand: {
      type: [Boolean, String],
      default: false
    },
    /**
     * Get row as argument, must return class `String`
     */
    customRowClass: {
      type: Function,
      default: null
    },
    /**
     * Get row as argument, must return style `String`
     */
    customRowStyle: {
      type: Function,
      default: null
    },
    /**
     * Show/hide checkboxes
     */
    selectable: {
      type: Boolean,
      default: false
    },
    /**
     * Whether to drag columns, on end of a drag throw `{ oldPositionIndex, newPositionIndex }` to `@change-order` handler
     */
    draggable: {
      type: Boolean,
      default: false
    },
    defaultSort: {
      type: Object,
      default: () => ({
        key: null,
        direction: 'ascending'
      })
    },
    /**
     * Text for empty table
     */
    emptyText: {
      type: String,
      default: null
    }
  },

  data() {
    return {
      timer: 2,
      isLoadingAnimationComplete: true,
      loaderWrapperHeight: 0,
      scrolled: 0,
      wrapperWidth: 0,
      tableWrapper: null,
      treeRows: [],
      loaderRow: null,
      wrapperClass: '',
      checkedRows: [],
      sort: this.defaultSort
    };
  },

  computed: {
    areAllChecked: {
      get() {
        return this.checkedRows.length === this.rows.length;
      },
      set(isChecked) {
        this.checkedRows = isChecked
          ? Array.from(Array(this.computedRows.length).keys())
          : [];
      }
    },

    tableClasses() {
      return {
        'q-table__draggable': this.draggable,
        'q-table__selectable': this.selectable,
        'q-table__separated': this.isSeparated,
        'q-table__grid': this.grid,
        'q-table__fixed-cols': this.fixedColumn.length,
        'q-table__fixed': this.fixedLayout
      };
    },

    isIndeterminate() {
      return Boolean(
        this.checkedRows.length && this.checkedRows.length !== this.rows.length
      );
    },

    isTotalExist() {
      return Boolean(Object.keys(this.total).length);
    },

    isLeftShadowShown() {
      return this.fixedColumn.length && this.scrolled > 0;
    },

    isRightShadowShown() {
      return this.fixedColumn.length && this.tableClass !== 'scrolled-right';
    },

    loadingWrapperClass() {
      return {
        height: this.loaderWrapperHeight ? `${this.loaderWrapperHeight}px` : '',
        transition: `all 0.${this.timer}s`
      };
    },

    tableClass() {
      if (this.scrolled === 0) return 'scrolled-left';

      const QTableWidth = this.$refs.QTable.offsetWidth;

      return this.scrolled === QTableWidth - this.wrapperWidth
        ? 'scrolled-right'
        : 'scrolled-center';
    },

    computedRows() {
      const rows = this.treeRows.length ? this.treeRows : this.rows;

      return rows.map((row, index) => ({
        ...row,
        $treeIndex: index
      }));
    }
  },

  watch: {
    isLoading() {
      this.isLoadingAnimationComplete = false;

      setTimeout(() => {
        this.loaderWrapperHeight = this.$refs.QTable
          ? this.$refs.QTable.clientHeight + shadowDropOffset
          : MIN_BLANK_TABLE_HEIGHT;

        setTimeout(() => {
          this.isLoadingAnimationComplete = true;
        }, 200);
      }, this.timer * 300);
    },
    rows: {
      handler(rows) {
        this.treeRows = rows.map((row, index) => {
          const updatedRow = {
            ...row,
            $treeIndex: index
          };

          const childs = updatedRow[this.childrenKey];

          if (childs) {
            updatedRow[this.childrenKey] = this.updateChildrenRows(
              childs,
              row,
              updatedRow
            );
          }

          return updatedRow;
        });
      },
      immediate: true
    },
    checkedRows(rowsIndexes) {
      const rows = this.computedRows.filter((_, index) =>
        rowsIndexes.includes(index)
      );

      this.$emit('rows-check', rows);
    }
  },

  updated() {
    this.changeWrapperHeight();
  },

  created() {
    window.addEventListener('resize', this.changeWrapperHeight, {
      passive: true
    });
  },

  destroyed() {
    window.removeEventListener('resize', this.changeWrapperHeight);
  },

  mounted() {
    if (this.$refs.QTable) {
      this.loaderWrapperHeight =
        this.$refs.QTable.clientHeight + shadowDropOffset;
    }

    const wrapper = this.$refs?.tableWrapper ?? null;

    if (wrapper && this.$refs.QTable) {
      if (wrapper.offsetWidth < this.$refs.QTable.offsetWidth) {
        this.wrapperClass = 'q-table__wrapper_scrollable';
      }

      wrapper.addEventListener('scroll', this.onScroll, {
        passive: true
      });

      this.wrapperWidth = wrapper.offsetWidth;
    }
  },

  beforeDestroy() {
    if (!this.$refs.tableWrapper) return;

    this.$refs.tableWrapper.removeEventListener('scroll', this.onScroll);
  },

  methods: {
    changeWrapperHeight() {
      if (this.isLoading || !this.isLoadingAnimationComplete) return;

      this.loaderWrapperHeight = this.$refs.QTable
        ? this.$refs.QTable.clientHeight + shadowDropOffset
        : MIN_BLANK_TABLE_HEIGHT;
    },

    updateChildrenRows(childs, row, updatedRow) {
      return childs.map(child => {
        const updatedChildRow = {
          ...child,
          $parentRow: row,
          indent: updatedRow.indent + this.indentSize || this.indentSize,
          $treeIndex: updatedRow.$treeIndex
        };

        const rowChilds = updatedChildRow[this.childrenKey];

        if (rowChilds) {
          updatedChildRow[this.childrenKey] = this.updateChildrenRows(
            rowChilds,
            child,
            updatedChildRow
          );
        }

        return updatedChildRow;
      });
    },

    handleHeaderClick({ key, sortable }) {
      if (!sortable) return;
      this.setSort(key);
    },

    getHandlerClass(group) {
      return `${this.isSeparated ? group : 'column'}-handler`;
    },

    findSlotForRow(columnKey) {
      const currentCol = this.columns.find(({ key }) => key === columnKey);

      return currentCol?.slots?.row ?? null;
    },

    handleRowClick(row) {
      this.$emit('row-click', row);
    },

    handleRowCheck({ isChecked, rowIndex }) {
      const checkedRows = new Set(this.checkedRows);

      if (isChecked) {
        checkedRows.add(rowIndex);
      } else {
        checkedRows.delete(rowIndex);
      }

      this.checkedRows = Array.from(checkedRows);
    },

    setSort(key, direction) {
      if (direction) {
        this.sort = {
          key,
          direction
        };

        this.$emit('change-sort', this.sort);

        return;
      }

      if (this.sort.key !== key) {
        this.sort = {
          key,
          direction: this.sort.direction ?? 'ascending'
        };

        this.$emit('change-sort', this.sort);

        return;
      }

      switch (this.sort.direction) {
        case null:
          this.sort.direction = 'ascending';
          break;
        case 'ascending':
          this.sort.direction = 'descending';
          break;
        default:
        case 'descending':
          this.sort.direction = null;
          break;
      }

      this.$emit('change-sort', this.sort);
    },

    levelClass(indent) {
      if (!indent) return '';
      return `q-table__row-level-${indent / this.indentSize}`;
    },

    handleExpandClick(row) {
      if (!row.$isTreeOpened) {
        this.$emit('load-by-expand', row, this.resolve);
      }

      this.treeRows = this.computedRows;

      const parentRow = this.findScopedRow(
        this.treeRows[row.$treeIndex],
        this.uniqueKey,
        row[this.uniqueKey]
      );

      this.$delete(parentRow, [this.childrenKey]);
      this.$delete(parentRow, '$isTreeOpened');
    },

    findScopedRow(row, key, value) {
      let foundRow = null;

      if (row[key] === value) {
        foundRow = row;
      }

      if (!foundRow && row[this.childrenKey]) {
        row[this.childrenKey].forEach(childRow => {
          if (!foundRow) foundRow = this.findScopedRow(childRow, key, value);
        });
      }

      return foundRow;
    },

    resolve(row, newChilds, isAdditional) {
      this.treeRows = this.computedRows;

      const parentRow = this.findScopedRow(
        this.treeRows[row.$treeIndex],
        this.uniqueKey,
        row[this.uniqueKey]
      );

      let loaderRow = null;

      let updatedChilds = newChilds.map(child => {
        if (child[this.pagesInExpand]) {
          loaderRow = { ...child, $parentRow: row };
        }
        return {
          ...child,
          $parentRow: row,
          indent: row.indent + this.indentSize || this.indentSize,
          $treeIndex: row.$treeIndex
        };
      });

      if (this.pagesInExpand && loaderRow) {
        updatedChilds = updatedChilds.filter(
          child => !child[this.pagesInExpand]
        );
        updatedChilds.push(loaderRow);
      }

      if (isAdditional && parentRow[this.childrenKey]) {
        const childs = parentRow[this.childrenKey].filter(
          child => !child[this.pagesInExpand]
        );

        this.$set(parentRow, [this.childrenKey], [...childs, ...updatedChilds]);
      } else {
        this.$set(parentRow, [this.childrenKey], updatedChilds);
      }

      parentRow.$isTreeOpened = true;

      return this.treeRows;
    },

    onScroll({ target }) {
      this.scrolled = target.scrollLeft;
    },

    getHeaderCellStyle(group) {
      if (!this.isSeparated || !group) return {};

      return {
        borderColor: this.groupsColors?.[group] ?? ''
      };
    },

    getCellClasses(column = {}) {
      const classes = [this.getSortableClass(column)];

      if (this.isSeparated) {
        if (!column.group)
          console.warn(
            `[QTable] Column ${column.key} must have \`group\` prop`
          );
        else classes.push(`q-table__header-cell_${column.group}`);
      }

      if (column.align) {
        classes.push(`q-table__header-cell_align-${column.align}`);
      }

      if (this.fixedColumn.length && this.fixedColumn === column.key) {
        classes.push('q-table__cell_fixed');
      }

      return classes;
    },

    getSortableClass(column) {
      const isColumnSortable = column?.sortable ?? null;

      const sortableClass =
        this.sort.key === column.key && this.sort.direction
          ? `q-table__cell-sortable_${this.sort.direction}`
          : 'q-table__cell-sortable';

      if (!isColumnSortable) return '';

      if (this.sort.key === column?.key) {
        return `${sortableClass} ${sortableClass}`;
      }

      return sortableClass;
    },

    getColWidth(column) {
      if (this.fixedColumn !== column.key && column.key !== 'shadow')
        return {
          width: column.width ?? this.defaultColWidth
        };

      return {
        width: this.fixedColumnWidth ?? this.defaultColWidth
      };
    },

    updateItem(item, index, key) {
      let $value = null;

      if (item[key] === 0 || Boolean(item[key])) {
        $value = item[key];
      }

      if (item.value) {
        $value = item.value;
      }

      return {
        ...item,
        $key: key || null,
        $index: index,
        $value
      };
    },

    changeColumnsOrder(positions) {
      this.$emit('change-order', positions);
    }
  }
};
</script>
