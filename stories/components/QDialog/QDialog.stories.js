import Vue from 'vue';

import QDialog from '../../../src/qComponents/QDialog';
import QDialogComponent from '../../../src/qComponents/QDialog/src/QDialog.vue';

export default {
  title: 'Components/QDialog',
  component: QDialogComponent
};

export const QDialogStory = () => ({
  data() {
    return { dialogInstance: null };
  },
  beforeDestroy() {
    // Use it to destroy dialog in handmode from outside
    if (this.dialogInstance) this.dialogInstance.$destroy();
  },
  methods: {
    async handleClick() {
      const { answer, instance } = QDialog.bind(Vue)({
        title: 'Morbi massa libero, vehicula nec consequat sed, porta a sem.',
        component: () => import('./DialogFormTest')
      });

      this.dialogInstance = instance;

      console.log('instance', instance);
      console.log('answer', await answer);
    }
  },
  template: '<q-button @click="handleClick">Click to open</q-button>'
});

QDialogStory.storyName = 'Default';
