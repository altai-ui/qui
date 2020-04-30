<template>
  <div>
    <el-row>
      <el-button>Default</el-button>
      <el-button type="primary">Primary</el-button>
      <el-button disabled>Disabled</el-button>
    </el-row>

    <el-row>
      <el-button plain>Plain</el-button>
      <el-button
        plain
        type="primary"
      >Plain primary</el-button>
      <el-button
        plain
        disabled
      >Disabled</el-button>
    </el-row>

    <el-row>
      <el-button
        icon="el-icon-search"
        circle
      />
      <el-button
        icon="el-icon-edit"
        circle
      />
      <el-button
        icon="el-icon-check"
        circle
      />
      <el-button
        icon="el-icon-check"
        circle
        disabled
      />
    </el-row>
  </div>
</template>
