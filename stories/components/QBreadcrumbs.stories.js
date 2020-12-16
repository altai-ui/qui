import Vue from 'vue';

import QBreadcrumbs from '../../src/qComponents/QBreadcrumbs';

export default {
  title: 'Components/QBreadcrumbs',
  component: QBreadcrumbs
};

Vue.component('router-link', {
  props: {
    to: {
      type: [String, Object],
      default: null
    }
  },
  template: '<a href="#" @click.prevent.stop><slot/></a>'
});

Object.defineProperty(Vue.prototype, '$route', {
  get() {
    return {
      matched: [
        {
          path: 'path-a',
          name: 'ROUTE_A',
          meta: {
            breadcrumb: this.$t('qBreadcrumbsStories.routeA')
          }
        },
        {
          path: 'path-b',
          name: 'ROUTE_B',
          meta: {
            breadcrumb: this.$t('qBreadcrumbsStories.routeB')
          }
        },
        {
          path: 'path-c',
          name: 'ROUTE_C',
          meta: {
            breadcrumb: this.$t('qBreadcrumbsStories.routeC')
          }
        },
        {
          path: 'path-d',
          name: 'ROUTE_D',
          meta: {
            breadcrumb: this.$t('qBreadcrumbsStories.routeD')
          }
        }
      ]
    };
  }
});

export const QBreadcrumbsStory = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `
    <q-breadcrumbs v-bind="$props" />
  `
});

QBreadcrumbsStory.storyName = 'Default';

export const QBreadcrumbsRouteStory = (_, { argTypes }) => ({
  props: Object.keys(argTypes).filter(val => val !== 'customRoutes'),
  data() {
    return {
      customRoutes: [
        {
          path: 'path-a',
          name: 'ROUTE_A',
          meta: {
            breadcrumb: this.$t('qBreadcrumbsStories.routeA')
          }
        },
        {
          path: 'path-b',
          name: 'ROUTE_b',
          meta: {
            breadcrumb: this.$t('qBreadcrumbsStories.routeB')
          }
        }
      ]
    };
  },
  template: `
    <q-breadcrumbs v-bind="$props" :custom-routes="customRoutes" />
  `
});

QBreadcrumbsRouteStory.storyName = 'Custom route';
