<template>
  <div class="demo">
    <div class="block">
      <span class="demonstration">Message Box with component</span>
      <q-button @click="handleOpenCompBtnClick">
        Click to open
      </q-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return { dialogInstance: null };
  },

  beforeDestroy() {
    // Use it to destroy dialog in handmode from outside
    if (this.dialogInstance) this.dialogInstance.$destroy();
  },

  methods: {
    async handleOpenCompBtnClick() {
      const { answer, instance } = this.$dialog({
        title: 'Morbi massa libero, vehicula nec consequat sed, porta a sem.',
        component: () => import('../../materials/FormTest')
      });

      this.dialogInstance = instance;

      console.log('instance', instance);
      console.log('answer', await answer);
    }
  }
};
</script>
