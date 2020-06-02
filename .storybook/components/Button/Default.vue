<template>
  <div>
    <div class="block">
      <span class="demonstration">without props</span>
      <el-row>
        <el-button>Default</el-button>
      </el-row>
    </div>
    <div class="block">
      <span
        class="demonstration"
      >add props <b>type="primary"</b> for 200px fixed width or
        <b>disabled</b> for disable</span>
      <el-row>
        <el-button type="primary">Primary</el-button>
        <el-button disabled>Disabled</el-button>
      </el-row>
    </div>
    <div class="block">
      <span
        class="demonstration"
      >add prop <b>plain</b> for secondary style</span>
      <el-row>
        <el-button plain>Plain</el-button>
        <el-button
          plain
          disabled
        >Disabled</el-button>
      </el-row>
    </div>
    <div class="block">
      <span
        class="demonstration"
      >add class <b>full-width</b> for filling parent container width</span>
      <el-row>
        <el-button class="full-width">Default</el-button>
      </el-row>
    </div>
  </div>
</template>
