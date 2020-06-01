<template>
  <div class="demo">
    <span
      class="demonstration"
    >For styling row with color add <b>:row-class-name</b> prop with following
      values: green-row, red-row, grey-row</span>
    <el-table
      :data="tableData"
      style="width: 100%"
      :row-class-name="tableRowClassName"
    >
      <el-table-column
        prop="date"
        label="Date"
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
      />
    </el-table>
  </div>
</template>

<style>
.el-table .warning-row {
  background: #fdf5e6;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>

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
          date: '2016-05-04',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        },
        {
          date: '2016-05-01',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        },
        {
          date: '2016-05-01',
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
  },
  methods: {
    tableRowClassName({ rowIndex }) {
      if (rowIndex === 1) {
        return 'green-row';
      }
      if (rowIndex === 3) {
        return 'red-row';
      }
      if (rowIndex === 5) {
        return 'grey-row';
      }
      return '';
    }
  }
};
</script>
