<template>
  <div class="demo">
    <el-row>
      <div class="block">
        <span class="demonstration">Default</span>
        <el-select
          v-model="value1"
          clearable
          placeholder="Выберите вариант (single)"
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
    <div class="block">
      <el-row :gutter="18">
        <span class="demonstration">Multiple</span>
        <el-col :span="12">
          <el-select
            v-model="value2"
            multiple
            clearable
            placeholder="Выберите вариант (non collapse)"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            />
          </el-select>
        </el-col>
        <el-col :span="12">
          <el-select
            v-model="value2"
            multiple
            collapse-tags
            placeholder="Выберите вариант (collapse)"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            />
          </el-select>
        </el-col>
      </el-row>
    </div>
    <el-row>
      <div class="block">
        <span class="demonstration">Отсутствуют варианты для выбора</span>
        <el-select
          multiple
          collapse-tags
          placeholder="Выберите"
        />
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
          value: 'Вариант 1',
          label: 'Вариант 1'
        },
        {
          value: 'Вариант 2',
          label: 'Вариант 2'
        },
        {
          value: 'Очень длинный примерва варианта 3',
          label: 'Очень длинный примерва варианта 3'
        },
        {
          value: 'Вариант 4',
          label: 'Вариант 4',
          disabled: true
        },
        {
          value: 'Очень длинный примерва варианта 5',
          label: 'Очень длинный примерва варианта 5',
          disabled: true
        },
        {
          value: 'Option 6',
          label: 'Option 6'
        }
      ],
      value1: '',
      value2: ['Вариант 4']
    };
  }
};
</script>
