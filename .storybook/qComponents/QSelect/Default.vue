<template>
  <div class="demo">
    <div class="block">
      <span class="demonstration">Default</span>
      <q-select
        v-model="value1"
        clearable
        placeholder="Выберите вариант (single)"
      >
        <q-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :disabled="item.disabled"
        />
      </q-select>
    </div>

    <div class="block">
      <span class="demonstration">Multiple</span>
      <q-select
        v-model="value2"
        multiple
        clearable
        placeholder="Выберите вариант (non collapse)"
      >
        <q-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :disabled="item.disabled"
        />
      </q-select>
    </div>
    <div class="block">
      <span class="demonstration">Collapsed-tags</span>
      <q-select
        v-model="value2"
        multiple
        collapse-tags
        placeholder="Выберите вариант (collapse)"
      >
        <q-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :disabled="item.disabled"
        />
      </q-select>
    </div>

    <div class="block">
      <span class="demonstration">No options</span>
      <q-select
        value=""
        multiple
        collapse-tags
        placeholder="Выберите"
      />
    </div>

    <div class="block">
      <span class="demonstration">Disabled</span>
      <q-select
        v-model="value1"
        disabled
        placeholder="Выберите значение"
      >
        <q-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :disabled="item.disabled"
        />
      </q-select>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          value: 'var 1',
          label: 'Вариант 1'
        },
        {
          value: 'var 2',
          label: 'Вариант 2'
        },
        {
          value: 'Очень длинный пример варианта 3',
          label: 'Очень длинный пример варианта 3'
        },
        {
          value: 'var 3',
          label: 'Вариант 4',
          disabled: true
        },
        {
          value: 'var 5',
          label: 'Очень длинный пример варианта 5',
          disabled: true
        },
        {
          value: 'Option 6',
          label: 'Option 6'
        }
      ],
      value1: 'var 1',
      value2: ['var 1', 'var 2']
    };
  }
};
</script>
