<template>
  <div id="app">
    <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
      <div class="navbar-menu is-active">
        <div class="navbar-start">
          <div class="navbar-item">
            <router-link to="/">Dictator</router-link>
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
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'electron-dictator',
};
</script>

<style>
/* CSS */
</style>
