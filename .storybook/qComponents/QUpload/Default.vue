<template>
  <div>
    <div class="block">
      <q-upload
        v-model="formModel.file"
        :accept="['image/*', '.pdf']"
        :on-select-file="handleFileSelect"
      />
    </div>
    <div class="block">
      <q-upload
        v-model="formModel.file"
        disabled
        :accept="['image/jpeg', 'image/png', 'image/gif']"
        :on-select-file="handleFileSelect"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formModel: {
        file: null
      }
    };
  },

  methods: {
    async handleFileSelect(sourceFile) {
      const promise = () =>
        new Promise(resolve => {
          setTimeout(() => resolve(sourceFile), 1000);
        });

      try {
        return await promise();
      } catch {
        return null;
      }
    }
  }
};
</script>
