<template>
  <v-card class="record-list" height="100%">
    <v-toolbar dark>
      <v-toolbar-title>Recordings</v-toolbar-title>
    </v-toolbar>
    <v-list class="record-list__list">
      <template v-for="(record, index) in recordings">
        <v-list-tile avatar :key="record._id" @click="playRecord(index)">
          <v-list-tile-content>
            <v-list-tile-title>
              <div class="record-list__content">
                <div class="mr-3" v-if="!record.active" style="min-width: 24px; text-align: center; margin-left: -7px;">
                  {{index + 1}}
                </div>
                <div class="mr-3" v-if="record.active" style="margin-left: -7px;">
                  <v-icon color="primary">
                    play_arrow
                  </v-icon>
                </div>
                <div class="record-list__title pr-3">
                  <b>{{record.title}}</b>
                </div>
                <div class="record-list__date px-3">
                  {{record.createdAt | date}}
                </div>
                <div class="record-list__duration pl-3">
                  {{record.duration}}
                </div>
              </div>
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
  </v-card>
</template>

<script>
import moment from 'moment';
import { mapGetters, mapActions } from 'vuex';

export default {
  mounted() {
    if (this.recordings.length) {
      this.playRecord(0);
    }
  },
  filters: {
    date(val) {
      return moment(val).fromNow();
    },
  },
  computed: {
    ...mapGetters({
      recordings: 'getRecordings',
    }),
  },
  methods: {
    ...mapActions({
      playRecord: 'loadRecording',
    }),
  },
};
</script>

<style>
.record-list {
  position: relative;
  overflow-y: auto;
}

.record-list::-webkit-scrollbar {
  width: 5px;
}
 
.record-list::-webkit-scrollbar-track {
  background: transparent;
}

.record-list::-webkit-scrollbar-thumb {
  opacity: 0;
  transition: opacity 1s;
}
 
.record-list:hover::-webkit-scrollbar-thumb {
  border-left: 2px solid #3498db;
  opacity: 1;
}

.record-list__list {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}
.record-list__content {
  display: flex;
  justify-content: space-between;
}

.record-list__title {
  width: 50%;
}
.record-list__date {
  width: 30%;
}
.record-list__duration {
  text-align: right;
  width: 20%;
}

</style>
