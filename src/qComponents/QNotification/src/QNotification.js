import Vue from 'vue';

import QNotification from './QNotification.vue';

const instances = [];
let instancesCounter = 1;

const parent = document.createElement('div');
parent.className = 'q-notification-box';

const Notification = (config = {}) => {
  instancesCounter += 1;
  const id = `notification_${instancesCounter}`;

  const NotificationConstructor = Vue.extend(QNotification);
  const instance = new NotificationConstructor();

  Object.entries(config).forEach(([key, value]) => {
    instance[key] = value;
  });

  instance.id = id;
  instance.onClose = () => {
    Notification.close(id, config.onClose);
  };

  if (
    config.message &&
    Object.prototype.hasOwnProperty.call(config.message, 'componentOptions')
  ) {
    instance.$slots.default = [config.message];
    instance.message = null;
  } else {
    delete instance.$slots.default;
  }

  parent.style.zIndex = Vue.prototype.$Q?.zIndex + 1 ?? 2000;
  document.body.appendChild(parent);
  parent.appendChild(instance.$mount().$el);

  Vue.nextTick(() => {
    instance.isShown = true;
  });

  instances.push(instance);
  return instance;
};

Notification.close = (instanceId, onClose) => {
  if (typeof onClose === 'function') onClose();

  const foundInstanceIndex = instances.findIndex(({ id }) => id === instanceId);
  instances.splice(foundInstanceIndex, 1);
};

Notification.closeAll = () => {
  for (let i = instances.length - 1; i >= 0; i -= 1) {
    instances[i].close();
  }
};

export default Notification;
