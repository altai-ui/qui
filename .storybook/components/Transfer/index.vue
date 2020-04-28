<template>
  <div style="text-align: center">
    <el-transfer
      v-model="value"
      style=" display: inline-block;text-align: left"
      filterable
      :left-default-checked="[2, 3]"
      :right-default-checked="[1]"
      :render-content="renderFunc"
      :titles="['Source', 'Target']"
      :button-texts="['To left', 'To right']"
      :format="{
        noChecked: '${total}',
        hasChecked: '${checked}/${total}'
      }"
      :data="data"
      @change="handleChange"
    >
      <el-button
        slot="left-footer"
        class="transfer-footer"
        size="small"
      >Operation</el-button>
      <el-button
        slot="right-footer"
        class="transfer-footer"
        size="small"
      >Operation</el-button>
    </el-transfer>
    <p style=" margin: 50px 0 20px;text-align: center">
      Customize data items using scoped slot
    </p>
    <div style="text-align: center">
      <el-transfer
        v-model="value4"
        style=" display: inline-block;text-align: left"
        filterable
        :left-default-checked="[2, 3]"
        :right-default-checked="[1]"
        :titles="['Source', 'Target']"
        :button-texts="['To left', 'To right']"
        :format="{
          noChecked: '${total}',
          hasChecked: '${checked}/${total}'
        }"
        :data="data"
        @change="handleChange"
      >
        <span
          slot-scope="{ option }"
        >{{ option.key }} - {{ option.label }}</span>
        <el-button
          slot="left-footer"
          class="transfer-footer"
          size="small"
        >Operation</el-button>
        <el-button
          slot="right-footer"
          class="transfer-footer"
          size="small"
        >Operation</el-button>
      </el-transfer>
    </div>
  </div>
</template>

<style>
.transfer-footer {
  margin-left: 20px;
  padding: 6px 5px;
}
</style>

<script>
export default {
  data() {
    const generateData = () => {
      const data = [];
      for (let i = 1; i <= 15; i += 1) {
        data.push({
          key: i,
          label: `Option ${i}`,
          disabled: i % 4 === 0
        });
      }
      return data;
    };
    return {
      data: generateData(),
      value: [1],
      value4: [1],
      renderFunc(h, option) {
        return (
          <span>
            {option.key} - {option.label}
          </span>
        );
      }
    };
  },

  methods: {
    handleChange(value, direction, movedKeys) {
      console.log(value, direction, movedKeys);
    }
  }
};
</script>
