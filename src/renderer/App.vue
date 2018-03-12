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
      <v-footer :fixed="fixed" app>
        <v-spacer></v-spacer>
        <span>&copy; 2017</span>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'electron-transcriber',
  data: () => ({
    clipped: true,
    drawer: false,
    fixed: false,
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
  /* Global CSS */
.button--huge {
  height: 88px;
}
</style>
