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
import Database from '../../js/database';

export default {
  data() {
    return {
      recordings: [],
    };
  },
  mounted() {
    this.getRecordings();
  },
  filters: {
    date(val) {
      return moment(val).format('dddd, MMMM Do YYYY, h:mm:ss a');
    },
  },
  methods: {
    getRecordings() {
      Database.recordings.all().then((all) => {
        this.recordings = all;
      });
    },
  },
};
</script>
