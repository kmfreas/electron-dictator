<template>
  <v-card>
    <v-card-actions class="pa-0 record-control">
      <v-btn :color="buttonColor" dark @click="handle" class="ma-0" large>
        <v-icon dark>{{icon}}</v-icon>
      </v-btn>
      <input type="text" placeholder="Title" v-model="title" class="record-control__title py-2 px-3" maxlength="70">
      <span class="px-2">{{duration}}</span>
    </v-card-actions>
    <v-snackbar :timeout="6000" :bottom="true" :right="true" v-model="showSnackbar">
      Recording saved
      <v-btn flat color="primary" @click.native="showSnackbar = false">Close</v-btn>
    </v-snackbar>
    <v-snackbar color="warning" :timeout="6000" :bottom="true" :right="true" v-model="showInvalidCredentialsSnackbar">
      Credentials invalid
      <v-btn flat @click.native="showInvalidCredentialsSnackbar = false"><router-link to="/settings" class="white--text" style="text-decoration: none">Fix</router-link></v-btn>
    </v-snackbar>
  </v-card>
</template>

<script>
import Easytimer from 'easytimer.js';
import Record from '../../js/record';
import Credentials from '../../js/credentials';

export default {
  data() {
    return {
      recording: false,
      title: null,
      timer: new Easytimer(),
      duration: null,
      showSnackbar: false,
      showInvalidCredentialsSnackbar: false,
      credentialsValid: true,
    };
  },
  computed: {
    buttonColor() {
      return this.recording ? 'error' : 'primary';
    },
    icon() {
      return this.recording ? 'stop' : 'mic';
    },
  },
  mounted() {
    this.timer.addEventListener('secondsUpdated', () => {
      this.duration = this.timer.getTimeValues().toString();
    });
    Credentials.check().then((errors) => {
      this.showInvalidCredentialsSnackbar = !!errors.length;
      this.credentialsValid = errors.length === 0;
    });
  },
  methods: {
    handle() {
      this.recording = !this.recording;
      if (this.recording) {
        this.start();
      } else {
        this.stop();
      }
    },
    start() {
      Record.start();
      this.file = Record.getPath();
      this.timer.start();
    },
    stop() {
      this.timer.stop();
      Record.stop(this.title);
      this.showSnackbar = true;
      this.duration = null;
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
