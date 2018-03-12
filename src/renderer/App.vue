<template>
  <div id="app">
    <v-app dark>
      <v-navigation-drawer
        fixed
        :mini-variant="miniVariant"
        :clipped="clipped"
        v-model="drawer"
        app
      >
        <v-list>
          <v-list-tile 
            router
            :to="item.to"
            :key="i"
            v-for="(item, i) in items"
            exact
          >
            <v-list-tile-action>
              <v-icon v-html="item.icon"></v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-text="item.title"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar fixed app :clipped-left="clipped">
        <v-toolbar-side-icon @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title v-text="title"></v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-content>
        <v-container fluid fill-height grid-list-xl>
          <v-slide-y-transition mode="out-in">
            <router-view></router-view>
          </v-slide-y-transition>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'electron-transcriber',
  data: () => ({
    clipped: false,
    drawer: false,
    items: [
      { icon: 'record_voice_over', title: 'Record', to: '/' },
      { icon: 'info', title: 'About', to: '/about' },
      { icon: 'settings', title: 'Settings', to: '/settings' },
    ],
    miniVariant: true,
    title: 'Transcriber',
  }),
  mounted() {
    this.loadCredentials();
  },
  methods: {
    ...mapActions({
      loadCredentials: 'loadCredentials',
    }),
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons');
.button--huge {
  height: 88px;
}

html, body {
  overflow-x: hidden;
  overflow-y: auto;
  overflow: hidden;
}

#app,
.theme--light .card,
.theme--dark .card  {
  background-image: url('./assets/background.jpg');
  background-position: center center;
  background-size: cover;
  position: relative;
  background-attachment: fixed;
}
.theme--light .card,
.theme--light .list,
.theme--dark .card,
.theme--dark .list,
.theme--dark .toolbar,
.application .theme--dark.toolbar {
  background-color: transparent;
}

.application .theme--dark.toolbar {
  background-color: rgba(52, 152, 219, .07);
}

.theme--dark .toolbar {
  box-shadow: none;
}

.theme--light .card,
.theme--dark .card {
  overflow: hidden;
  box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.1), 0px 1px 1px 0px rgba(0,0,0,0.07), 0px 1px 3px 0px rgba(0,0,0,0.06)
}

.theme--light .card > *,
.theme--dark .card > * {
  position: relative;
  z-index: 1;
}
.card::before,
#app::before,
.card::after {
  position: absolute;
  top: -5px;
  right: -5px;
  bottom: -5px;
  left: -5px;
  content: '';
}
#app::before {
  /* filter: blur(1px); */
  background: inherit;
}
.card::before {
  background: inherit;
  filter: blur(10px);
}

.card::after {
  background-color: rgba(44,62,80, .05);
}

::-webkit-input-placeholder { /* Chrome/Opera/Safari */
  color: #fafafa;
}
::-moz-placeholder { /* Firefox 19+ */
  color: #fafafa;
}
:-ms-input-placeholder { /* IE 10+ */
  color: #fafafa;
}
:-moz-placeholder { /* Firefox 18- */
  color: #fafafa;
}

</style>
