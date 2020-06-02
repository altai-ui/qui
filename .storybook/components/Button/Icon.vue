<template>
  <div>
    <div class="block">
      <span
        class="demonstration"
      >add class <b>icon</b> to button (default size 24x24)</span>
      <el-row>
        <el-button
          icon="q-icon-pic"
          class="icon"
        ></el-button>
        <el-button
          plain
          class="icon"
          icon="q-icon-cloud-upload"
        > </el-button>
        <el-button
          class="icon"
          circle
          icon="q-icon-question-mark"
        />
      </el-row>
    </div>
    <span
      class="demonstration"
    >add prop <b>size="medium"</b> to scale icon button to 40x40</span>
    <div class="block">
      <el-row>
        <el-button
          icon="q-icon-pic"
          class="icon"
          size="medium"
        ></el-button>
        <el-button
          plain
          class="icon"
          size="medium"
        >
          <i class="q-icon-cloud-upload" />
        </el-button>
        <el-button
          class="icon"
          circle
          size="medium"
          icon="q-icon-question-mark"
        />
      </el-row>
    </div>
  </div>
</template>
