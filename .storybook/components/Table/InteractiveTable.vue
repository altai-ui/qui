<template>
  <div class="demo">
    <span class="demonstration">
      If you have links on row you must add 'interactive-row' class to
      <b>:row-class-name</b> prop</span>
    <el-table
      :data="tableData"
      :default-sort="{ prop: 'date', order: 'descending' }"
      style="width: 100%"
      row-class-name="interactive-row"
    >
      <el-table-column
        prop="date"
        label="Date"
        sortable
        width="180"
      />
      <el-table-column
        prop="name"
        label="Name"
        width="180"
      />
      <el-table-column
        prop="address"
        label="Address"
        :formatter="formatter"
      />
      <el-table-column
        prop="address"
        label="Very long string with custom Address"
      />
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
          date: '2016-05-01',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        }
      ]
    };
  }
};
</script>
