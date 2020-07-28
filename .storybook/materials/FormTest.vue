<template>
  <el-form
    ref="form"
    :model="formModel"
    :rules="rules"
  >
    <div class="q-message-box__content">
      <el-form-item
        prop="name"
        label="Name"
        required
      >
        <q-input v-model="formModel.name" />
      </el-form-item>
    </div>

    <div class="q-message-box__actions">
      <q-button
        :loading="isSending"
        @click="handleSendClick"
      >
        Send
      </q-button>

      <q-button
        theme="secondary"
        @click="handleCancelClick"
      >
        Cancel
      </q-button>
    </div>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      isSending: false,
      formModel: {
        name: 'Testname'
      },
      rules: {
        name: {
          required: true,
          message: 'Please input name',
          trigger: 'blur'
        }
      }
    };
  },

  methods: {
    handleCancelClick() {
      this.$emit('close', { action: 'cancel' });
    },

    async handleSendClick() {
      this.isSending = true;

      const promise = () =>
        new Promise(resolve => {
          setTimeout(() => resolve('done'), 1000);
        });

      try {
        const payload = await promise();

        this.$emit('close', { action: 'confirm', payload });
      } catch (error) {
        console.log(error);
      }

      this.isSending = false;
    }
  }
};
</script>
