<template>
  <div class="demo">
    <el-dropdown>
      <span class="el-dropdown-link">
        Dropdown List
        <i class="el-icon-arrow-down el-icon--right" />
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>Action 1</el-dropdown-item>
        <el-dropdown-item>Action 2</el-dropdown-item>
        <el-dropdown-item>Action 3</el-dropdown-item>
        <el-dropdown-item disabled>Action 4</el-dropdown-item>
        <el-dropdown-item divided>Action 5</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<style>
.el-dropdown-link {
  color: #409eff;
  cursor: pointer;
}

.el-icon-arrow-down {
  font-size: 12px;
}
</style>
