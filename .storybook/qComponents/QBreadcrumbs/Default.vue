<template>
  <div>
    <div class="block">
      <span class="demonstration">Default Breadcrumbs</span>
      <q-breadcrumbs postfix="[postfix]" />
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

Object.defineProperty(Vue.prototype, '$route', {
  get() {
    return {
      matched: [
        {
          path: 'path-a',
          name: 'Роут a',
          meta: {
            breadcrumb: 'Роут a'
          }
        },
        {
          path: 'path-b',
          name: 'Очень длинный роут b',
          meta: {
            breadcrumb: 'Роут b'
          }
        },
        {
          path: 'path-c',
          name: 'Роут c',
          meta: {
            breadcrumb: 'Роут c'
          }
        },
        {
          path: 'path-d',
          name: 'Роут d',
          meta: {
            breadcrumb: 'Роут d'
          }
        }
      ]
    };
  }
});

export default {};
</script>
