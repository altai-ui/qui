<template>
  <div class="q-breadcrumbs">
    <template v-for="crumb in breadcrumbs">
      <router-link
        :key="crumb.path"
        :to="routerTo(crumb)"
        active-class="q-breadcrumbs__crumb_active"
        exact-active-class="q-breadcrumbs__crumb_exact-active"
        class="q-breadcrumbs__crumb"
      >
        {{ crumb.meta.breadcrumb }}
      </router-link>

      <span
        :key="`${crumb.path}divider`"
        class="q-breadcrumbs__divider q-icon-arrow-right"
      />
    </template>

    <div class="q-breadcrumbs__crumb q-breadcrumbs__crumb_last">
      {{ lastCrumb }}
    </div>

    <div
      v-if="postfix"
      class="q-breadcrumbs__postfix"
    >
      {{ postfix }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'QBreadcrumbs',

  props: {
    last: {
      type: String,
      default: null
    },
    postfix: {
      type: String,
      default: null
    },
    customRoutes: {
      type: Array,
      default: null
    }
  },

  computed: {
    crumbs() {
      const routes = this.customRoutes ?? this.$route.matched;

      return routes.filter(route => route.meta?.breadcrumb);
    },

    breadcrumbs() {
      const breadcrumbs = [...this.crumbs];
      breadcrumbs.pop();
      return breadcrumbs;
    },

    lastCrumb() {
      if (this.last) return this.last;

      return this.crumbs[this.crumbs.length - 1]?.meta.breadcrumb ?? '';
    }
  },

  methods: {
    routerTo({ name, path }) {
      return name ? { name } : path;
    }
  }
};
</script>
