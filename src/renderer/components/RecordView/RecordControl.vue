<template>
  <v-card>
    <v-card-actions class="pa-0 record-control">
      <v-btn :color="buttonColor" dark @click="handle" class="ma-0" large>
        <v-icon dark>{{icon}}</v-icon>
      </v-btn>
      <input type="text" placeholder="Title" v-model="title" class="record-control__title py-2 px-3" maxlength="70">
      <span class="px-2">{{duration}}</span>
    </v-card-actions>
    <v-snackbar color="warning" :timeout="6000" :bottom="true" :right="true" v-model="showInvalidCredentialsSnackbar">
      Credentials invalid
      <v-btn flat @click.native="showInvalidCredentialsSnackbar = false"><router-link to="/settings" class="white--text" style="text-decoration: none">Fix</router-link></v-btn>
    </v-snackbar>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';
import Easytimer from 'easytimer.js';
import Record from '../../js/record';

export default {
  data() {
    return {
      recording: false,
      title: null,
      timer: new Easytimer(),
      duration: null,
      showInvalidCredentialsSnackbar: false,
    };
  },
  computed: {
    buttonColor() {
      return this.recording ? 'error' : 'primary';
    },
    icon() {
      return this.recording ? 'stop' : 'mic';
    },
    ...mapGetters({
      credentials: 'getCredentials',
    }),
  },
  mounted() {
    this.timer.addEventListener('secondsUpdated', () => {
      this.duration = this.timer.getTimeValues().toString();
    });
  },
  methods: {
    handle() {
      if (this.credentials.valid) {
        this.recording = !this.recording;
        if (this.recording) {
          this.start();
        } else {
          this.stop();
        }
      } else {
        this.showInvalidCredentialsSnackbar = true;
      }
    },
    start() {
      Record.start();
      this.file = Record.getPath();
      this.timer.start();
    },
    stop() {
      this.timer.stop();
      Record.stop(this.title, this.duration);
      this.showSnackbar = true;
      this.duration = null;
      this.title = null;
    },
  },
};
</script>

<style>
.record-control__title {
  height: 44px;
  display: block;
  flex: 1;
  outline: 0;
}
</style>
