import Vue from 'vue';

import { QMessageBox } from '../../../src/qComponents';
import QMessageBoxComponent from '../../../src/qComponents/QMessageBox/src/QMessageBox.vue';

export default {
  title: 'Components/QMessageBox',
  component: QMessageBoxComponent
};

export const QMessageBoxStory = () => ({
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

    async handleClick() {
      try {
        const response = await QMessageBox.bind(Vue)({
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
    }
  },
  template: '<q-button @click="handleClick">Click to open</q-button>'
});

QMessageBoxStory.storyName = 'Default';

export const QMessageBoxComponentStory = () => ({
  methods: {
    async handleClick() {
      try {
        const response = await QMessageBox.bind(Vue)({
          title: 'Morbi massa libero, vehicula nec consequat sed, porta a sem.',
          component: () => import('./MessageBoxFormTest')
        });
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
  },
  template: '<q-button @click="handleClick">Click to open</q-button>'
});

QMessageBoxComponentStory.storyName = 'Component';

export const QMessageBoxHTMLStory = () => ({
  methods: {
    async handleClick() {
      try {
        const response = await QMessageBox.bind(Vue)({
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
    }
  },
  template: '<q-button @click="handleClick">Click to open</q-button>'
});

QMessageBoxHTMLStory.storyName = 'HTML';

export const QMessageBoxVNodeStory = () => ({
  methods: {
    async handleClick() {
      try {
        const h = this.$createElement;
        const response = await QMessageBox.bind(Vue)({
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
  },
  template: '<q-button @click="handleClick">Click to open</q-button>'
});

QMessageBoxVNodeStory.storyName = 'VNode';
