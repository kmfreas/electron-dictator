import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'record-view',
      component: require('@/components/RecordView').default,
    },
    {
      path: '/about',
      name: 'about',
      component: require('@/components/AboutView').default,
    },
    {
      path: '/settings',
      name: 'settings',
      component: require('@/components/SettingsView').default,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
