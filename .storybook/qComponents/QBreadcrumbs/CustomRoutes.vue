<template>
  <div>
    <div class="block">
      <span
        class="demonstration"
      >Breadcrumbs with <b>:custom-routes</b> prop</span>
      <q-breadcrumbs :custom-routes="customRoutes" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      customRoutes: [
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
            breadcrumb: 'Очень длинный роут b'
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
};
</script>
