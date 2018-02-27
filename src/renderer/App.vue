<template>
  <div id="app">
    <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
      <div class="navbar-menu is-active">
        <div class="navbar-start">
          <div class="navbar-item">
            <router-link to="/">Transcriber</router-link>
          </div>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <router-link to="/recordings">Your Recordings</router-link>
          </div>
          <div class="navbar-item">
            <router-link to="/settings">Settings</router-link>
          </div>
        </div>
      </div>
    </nav>
    <div class="section">
      <div class="container">
        <div v-for="error in errors" :key="error" class="notification is-warning">
          {{error}} Please add it in the settings page.
        </div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import router from './router';
import setup from './setup';
export default {
  name: 'electron-transcriber',
  data() {
    return {
      errors: null,
    };
  },
  mounted() {
    this.checkConfig();
    router.afterEach((to) => {
      if (to.name !== 'settings') {
        this.checkConfig();
      } else {
        this.errors = null;
      }
    });
  },
  methods: {
    checkConfig() {
      setup.verify().then((errors) => {
        this.errors = errors;
      });
    },
  },
};
</script>

<style>
/* CSS */
</style>
