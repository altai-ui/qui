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
  methods: {
    async handleOpenCompBtnClick() {
      try {
        const response = await this.$dialog({
          title: 'Morbi massa libero, vehicula nec consequat sed, porta a sem.',
          component: () => import('../../materials/FormTest')
        });
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
