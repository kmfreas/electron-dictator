<template>
  <v-card>
    <v-toolbar color="cyan" dark>
      <v-toolbar-title>Record</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-text-field
        name="input-1"
        label="Recording Title"
        id="testing"
        v-model="title"
      ></v-text-field>
    </v-card-text>
    <v-card-actions>
      <v-btn :color="buttonColor" icon dark @click="handle">
        <v-icon dark>{{icon}}</v-icon>
      </v-btn>
      {{duration}}
      <span v-if="!credentialsValid && recording">Not saving transcript. Enter your credentials in the settings page.</span>
    </v-card-actions>
    <v-snackbar :timeout="6000" :bottom="true" v-model="showSnackbar">
      Recording saved
      <v-btn flat color="primary" @click.native="showSnackbar = false">Close</v-btn>
    </v-snackbar>
    <v-snackbar color="warning" :timeout="60000" :bottom="true" v-model="showInvalidCredentialsSnackbar" :auto-height="true">
      Your credentials are invalid. You will not be able to save transcripts until your credentials are added in settings.
      <v-btn flat @click.native="showInvalidCredentialsSnackbar = false">Close</v-btn>
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
