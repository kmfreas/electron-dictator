import Vue from 'vue';
import axios from 'axios';
import fontawesome from '@fortawesome/fontawesome';
import { faPlay, faPause, faStop } from '@fortawesome/fontawesome-free-solid';
import path from 'path';
// eslint-disable-next-line
import { remote } from 'electron';
import fs from 'fs';

import App from './App';
import router from './router';
import store from './store';

import database from './api/database';

database.init();


fontawesome.library.add(faPlay, faPause, faStop);

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

const recordingsPath = path.join(remote.app.getPath('userData'), '/recordings');

if (!fs.existsSync(recordingsPath)) {
  fs.mkdirSync(recordingsPath);
}
