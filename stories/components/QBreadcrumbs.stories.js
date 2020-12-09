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
            breadcrumb: 'Роут A'
          }
        },
        {
          path: 'path-b',
          name: 'ROUTE_B',
          meta: {
            breadcrumb: 'Очень длинный роут B'
          }
        },
        {
          path: 'path-c',
          name: 'ROUTE_C',
          meta: {
            breadcrumb: 'Роут C'
          }
        },
        {
          path: 'path-d',
          name: 'ROUTE_D',
          meta: {
            breadcrumb: 'Роут D'
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
  props: Object.keys(argTypes),
  template: `
    <q-breadcrumbs v-bind="$props" />
  `
});

QBreadcrumbsRouteStory.storyName = 'Custom route';
QBreadcrumbsRouteStory.args = {
  customRoutes: [
    {
      path: 'path-a',
      name: 'ROUTE_A',
      meta: {
        breadcrumb: 'Роут A'
      }
    },
    {
      path: 'path-b',
      name: 'ROUTE_b',
      meta: {
        breadcrumb: 'Роут B'
      }
    }
  ]
};
