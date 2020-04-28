<template>
  <div class="demo">
    <div class="block">
      <span class="demonstration">When you have few pages</span>
      <el-pagination
        layout="prev, pager, next"
        :total="50"
      />
    </div>
    <div class="block">
      <span class="demonstration">When you have more than 7 pages</span>
      <el-pagination
        layout="prev, pager, next"
        :total="1000"
      />
    </div>
  </div>
</template>
