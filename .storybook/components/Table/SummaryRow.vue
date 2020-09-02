<template>
  <div class="demo">
    <el-table
      :data="tableData"
      :default-sort="{ prop: 'date', order: 'descending' }"
      style="width: 100%"
      class="summary-table"
    >
      <el-table-column
        prop="date"
        label="Date"
        sortable
        width="180"
        class-name="summary-column"
      >
        <template
          slot="header"
          slot-scope="scope"
        >
          <div class="title-row">
            {{ scope.column.label }}
          </div>
          <div class="summary-row">
            {{ totalData[scope.column.property] }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="Name"
        sortable
        width="180"
      />
      <el-table-column
        prop="address"
        label="Address"
        :formatter="formatter"
      />
      <el-table-column
        prop="address"
        label="Very long  long  long  long string with custom Address Very long  long  long  long string with custom Address"
      />
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      totalData: {
        date: '2016-05-02',
        name: 'summary name',
        address: 'summary adress'
      },
      tableData: [
        {
          date: '2016-05-03',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        },
        {
          date: '2016-05-02',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        },
        {
          date: '2016-05-04',
          name: 'Tom',
          address:
            'No. 189, Grove St, Los Angeles, No. 189, Grove St, Los Angeles, No. 189, Grove St, Los Angeles'
        },
        {
          date: '2016-05-01',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        }
      ]
    };
  },
  methods: {
    formatter(row) {
      return row.address;
    }
  }
};
</script>
