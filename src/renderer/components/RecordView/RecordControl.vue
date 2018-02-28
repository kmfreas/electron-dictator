<template>
  <v-card>
    <v-card-text>
      <v-text-field
        name="input-1"
        label="Recording Title"
        id="testing"
        v-model="title"
      ></v-text-field>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      {{duration}}
      <v-btn :color="buttonColor" icon dark @click="handle">
        <v-icon dark>{{icon}}</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import Easytimer from 'easytimer.js';
import Record from '../../js/record';

export default {
  data() {
    return {
      recording: false,
      title: null,
      timer: new Easytimer(),
      duration: null,
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
    },
  },
};
</script>
