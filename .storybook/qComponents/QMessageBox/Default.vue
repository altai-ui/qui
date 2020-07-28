<template>
  <div class="demo">
    <div class="block">
      <span class="demonstration">Message Box with text</span>
      <q-button @click="handleOpenTextBtnClick">
        Click to open
      </q-button>
    </div>

    <div class="block">
      <span class="demonstration">Message Box with component</span>
      <q-button @click="handleOpenCompBtnClick">
        Click to open
      </q-button>
    </div>

    <div class="block">
      <span class="demonstration">Message Box with HTML</span>
      <q-button @click="handleOpenHtmlBtnClick">
        Click to open
      </q-button>
    </div>

    <div class="block">
      <span class="demonstration">Message Box with VNode</span>
      <q-button @click="handleOpenVnodeBtnClick">
        Click to open
      </q-button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    async beforeClose({ action, ctx }) {
      if (action !== 'confirm') return true;

      ctx.isConfirmBtnLoading = true;

      const promise = () =>
        new Promise(resolve => {
          setTimeout(() => resolve('готово!'), 1000);
        });

      try {
        await promise();
        ctx.isConfirmBtnLoading = false;

        return true;
      } catch (error) {
        ctx.isConfirmBtnLoading = false;

        return false;
      }
    },

    async handleOpenTextBtnClick() {
      try {
        const response = await this.$message({
          title: 'Morbi massa libero, vehicula nec consequat sed, porta a sem.',
          message:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vehicula volutpat nulla et egestas. Mauris mollis, lorem vel aliquam gravida.',
          submessage:
            'Sed sit amet nibh consequat, pellentesque arcu ut, congue lorem.',
          confirmButtonText: 'Fusce blandit',
          cancelButtonText: 'Integer non',
          beforeClose: this.beforeClose
        });
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },

    async handleOpenCompBtnClick() {
      try {
        const response = await this.$message({
          title: 'Morbi massa libero, vehicula nec consequat sed, porta a sem.',
          component: () => import('../../materials/FormTest')
        });
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },

    async handleOpenHtmlBtnClick() {
      try {
        const response = await this.$message({
          title: 'Morbi massa libero, vehicula nec consequat sed, porta a sem.',
          message:
            '<strong>This</strong> is <i>HTML</i> <span style="color:red;">string</span>',
          dangerouslyUseHTMLString: true,
          submessage:
            'Sed sit amet nibh consequat, pellentesque arcu ut, congue lorem.',
          confirmButtonText: 'Fusce blandit'
        });
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },

    async handleOpenVnodeBtnClick() {
      try {
        const h = this.$createElement;
        const response = await this.$message({
          title: 'Morbi massa libero, vehicula nec consequat sed, porta a sem.',
          message: h('p', null, [
            h('span', null, 'Message can be '),
            h('i', { style: 'color: teal' }, 'VNode')
          ]),
          confirmButtonText: 'Fusce blandit'
        });
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
