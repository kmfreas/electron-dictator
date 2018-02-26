<template>
  <div>
    <h1 class="title">Record audio</h1>
    <div class="field">
      <div class="control">
        <input class="input" type="text" v-model="title" placeholder="Recording Title">
      </div>
    </div>

    <button class="button is-success" :class="{'is-danger': recording}" @click="handle">
      <span class="icon is-small">
        <font-awesome-icon :icon="icon" />
      </span>
    </button>
    <p>
      Saving file to {{file}}
    </p>
  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import Record from '../api/record';

export default {
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      recording: false,
      file: null,
      title: '',
    };
  },
  computed: {
    icon() {
      return this.recording ? 'stop' : 'play';
    },
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
    },
    stop() {
      Record.stop(this.title);
    },
  },
};
</script>
