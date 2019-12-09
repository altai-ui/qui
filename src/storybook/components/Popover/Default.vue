<template>
  <div class="demo">
    <el-row>
      <el-popover
        placement="top-start"
        title="Title"
        width="200"
        trigger="hover"
        content="this is content, this is content, this is content"
      >
        <el-button slot="reference">Hover to activate</el-button>
      </el-popover>
    </el-row>
    <el-row>
      <el-popover
        placement="bottom"
        title="Title"
        width="200"
        trigger="click"
        content="this is content, this is content, this is content"
      >
        <el-button slot="reference">Click to activate</el-button>
      </el-popover>
    </el-row>
    <el-row>
      <el-popover
        ref="popover"
        placement="right"
        title="Title"
        width="200"
        trigger="focus"
        content="this is content, this is content, this is content"
      >
      </el-popover>
      <el-button v-popover:popover>Focus to activate</el-button>
    </el-row>
    <el-row>
      <el-popover
        placement="bottom"
        title="Title"
        width="200"
        trigger="manual"
        content="this is content, this is content, this is content"
        v-model="visible"
      >
        <el-button slot="reference" @click="visible = !visible"
          >Manual to activate</el-button
        >
      </el-popover>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false
    }
  }
}
</script>
