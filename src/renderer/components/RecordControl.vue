<template>
  <div>
    <h1 class="title">Record audio</h1>
    <button class="button is-success" :class="{'is-danger': recording}" @click="handle">
      <span class="icon is-small">
        <font-awesome-icon :icon="icon" />
      </span>
    </button>
  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';

export default {
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      recording: false,
    };
  },
  computed: {
    icon() {
      return this.recording ? 'stop' : 'play';
    },
  },
  methods: {
    handle() {
      if (this.recording) {
        this.start();
      } else {
        this.stop();
      }
      this.recording = !this.recording;
    },
    start() {
    },
    stop() {

    },
  },
};
</script>
