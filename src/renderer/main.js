import Vue from 'vue';
import axios from 'axios';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.css';

import App from './App';
import router from './router';
import store from './store';
import './js/setup';

Vue.use(Vuetify, {
  theme: {
    theme: '#ECF0F1',
    primary: '#3498DB',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#E74C3C',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107',
    dark: '#000000',
  },
});

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>',
}).$mount('#app');
