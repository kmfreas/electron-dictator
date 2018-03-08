<template>
  <v-card>
    <v-toolbar color="cyan" dark>
      <v-toolbar-title>Your Recordings</v-toolbar-title>
    </v-toolbar>
    <v-list two-line>
      <template v-for="record in recordings">
        <v-list-tile avatar :key="record._id">
          <v-list-tile-action>
            <v-icon dark>play_circle_filled</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{record.title}}</v-list-tile-title>
            <v-list-tile-sub-title>{{record.createdAt | date}}</v-list-tile-sub-title>
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
