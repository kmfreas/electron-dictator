<template>
  <v-card class="record-player">
    <div class="record-player__left">
      <v-btn color="primary" flat dark @click="buttonHandle" class="ma-0 button--huge" large :disabled="audio.title === ' '">
        <v-icon>{{icon}}</v-icon>
      </v-btn>
    </div>
    <div class="record-player__right px-5">
      <div class="record-player__title">
        <b>{{audio.title}}</b>
      </div>
      <aplayer :music="audio" mode="order" ref="player" @pause="handlePlayerState(false)" @ended="handlePlayerState(false)" @play="handlePlayerState(true)"></aplayer>
    </div>
  </v-card>
</template>

<script>
import Aplayer from 'vue-aplayer';
import { mapGetters } from 'vuex';

export default {
  components: {
    Aplayer,
  },
  data() {
    return {
      playing: false,
    };
  },
  computed: {
    icon() {
      return this.playing ? 'pause' : 'play_arrow';
    },
    ...mapGetters({
      audio: 'getCurrentRecording',
    }),
  },
  methods: {
    handlePlayerState(state) {
      this.playing = state;
    },
    buttonHandle() {
      if (this.playing) {
        this.pause();
      } else {
        this.play();
      }
    },
    play() {
      this.$refs.player.play();
    },
    pause() {
      this.$refs.player.pause();
    },
  },
};
</script>

<style>
.record-player {
  display: flex;
  align-items: center;
}

.record-player__right {
  width: 100%;
}

.record-player__title {
  font-size: 16px;
}

.aplayer.aplayer {
  box-shadow: none;
  margin: 7px 0 0 0;
  overflow: visible;
}

.aplayer-pic,
.aplayer-list,
.aplayer .aplayer-info .aplayer-music,
.aplayer-controller .aplayer-volume-wrap.aplayer-volume-wrap,
.aplayer-controller .aplayer-time .aplayer-icon.aplayer-icon-mode {
  display: none;
}
.aplayer .aplayer-info.aplayer-info {
  margin: 0;
  padding: 0;
  height: auto;
}

.aplayer-controller .aplayer-bar-wrap.aplayer-bar-wrap {
  margin-left: 0;
}

.aplayer-thumb {
  /* margin-left: -5px !important; */
}
.aplayer-controller .aplayer-time.aplayer-time {
  color: #fff;
  font-weight: bold;
}
</style>
