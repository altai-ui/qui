import Vue from 'vue';

import QDialog from './QDialog.vue';

let currentPromise;

const defaultCallback = ({ payload }) => {
  currentPromise.resolve({ payload });
};

const Dialog = function(config = {}) {
  const DialogComponent = Vue.extend({
    components: {
      DialogContent: config.component
    },
    ...QDialog
  });

  const instance = new DialogComponent();

  Object.entries(config).forEach(([key, value]) => {
    instance[key] = value;
  });

  if (!instance.zIndex) {
    instance.zIndex = Vue.prototype.$Q?.zIndex ?? 2000;
  }

  instance.callback = defaultCallback;

  let parent = document.body;
  if (config.rootSelector) {
    parent = document.querySelector(config.rootSelector);
  }
  parent.appendChild(instance.$mount().$el);

  Vue.nextTick(() => {
    instance.isShown = true;
  });

  return {
    instance,
    answer: new Promise((resolve, reject) => {
      currentPromise = {
        resolve,
        reject
      };
    })
  };
};

export default Dialog;
