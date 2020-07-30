import QMessageBox from './QMessageBox.vue';

let currentPromise;

const defaultCallback = ({ action, payload }) => {
  if (action === 'confirm') {
    currentPromise.resolve({ action, payload });
  } else if (action === 'cancel' || action === 'close') {
    currentPromise.reject({ action });
  }
};

const Message = function(config = {}) {
  const MessageBox = this.extend({
    components: {
      MessageBoxContent: config.component
    },
    ...QMessageBox
  });

  const instance = new MessageBox();

  Object.entries(config).forEach(([key, value]) => {
    instance[key] = value;
  });

  if (!instance.zIndex) {
    const zIndex = this.prototype.$ELEMENT.zIndex ?? 2000;

    instance.zIndex = zIndex;
    this.prototype.$ELEMENT.zIndex = zIndex + 1;
  }

  instance.callback = defaultCallback;

  instance.isComponentUsed = Boolean(config.component);

  if (
    !instance.isComponentUsed &&
    Object.prototype.hasOwnProperty.call(config.message, 'componentOptions')
  ) {
    instance.$slots.default = [config.message];
    instance.message = null;
  } else {
    delete instance.$slots.default;
  }

  document.body.appendChild(instance.$mount().$el);

  this.nextTick(() => {
    instance.isShown = true;
  });

  return new Promise((resolve, reject) => {
    currentPromise = {
      resolve,
      reject
    };
  });
};

export default Message;
