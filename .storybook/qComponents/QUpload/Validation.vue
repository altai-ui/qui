<template>
  <div>
    <div class="block">
      <el-form
        ref="form"
        :model="formModel"
        :rules="rules"
      >
        <el-form-item
          label="Введите имя"
          prop="name"
        >
          <q-input v-model="formModel.name" />
        </el-form-item>
        <el-form-item
          label="Выберите файл"
          prop="file"
        >
          <q-upload
            v-model="formModel.file"
            :accept="['image/jpeg', 'image/png', 'image/gif']"
          />
        </el-form-item>
        <el-form-item>
          <q-button @click="handleClick">Click me</q-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formModel: {
        name: '',
        file: null
      },
      rules: {
        name: [
          {
            required: true,
            message: 'Введите имя',
            trigger: 'blur'
          }
        ],
        file: [
          {
            required: true,
            message: 'Выберите файл',
            trigger: 'change'
          }
        ]
      }
    };
  },

  methods: {
    handleClick() {
      this.$refs.form.validate(isValid => {
        if (!isValid) return;

        alert('Форма отправлена!');
        this.$refs.form.resetFields();
      });
    }
  }
};
</script>
