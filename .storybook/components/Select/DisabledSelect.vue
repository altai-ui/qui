<template>
  <div class="demo">
    <el-row>
      <div class="block">
        <span class="demonstration">Неактивный</span>
        <el-select
          disabled
          placeholder="Выберите значение"
        />
      </div>
    </el-row>
    <el-row>
      <div class="block">
        <span class="demonstration">Неактивный с выбранным значением</span>
        <el-select
          v-model="value"
          disabled
          placeholder="Выберите значение"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          />
        </el-select>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          value: 'Выбранное значение',
          label: 'Выбранное значение'
        }
      ],
      value: 'Выбранное значение'
    };
  }
};
</script>
