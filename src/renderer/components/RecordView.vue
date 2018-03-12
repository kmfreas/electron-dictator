<template>
  <v-layout column align-content-start justify-start>
    <record-messages v-if="!credentials.valid"></record-messages>
    <v-flex class="shrink" v-if="credentials.valid">
      <record-control></record-control>
    </v-flex>
    <record-notifications></record-notifications>
    <v-flex fill-height d-flex v-if="recordings.length && credentials.valid">
      <v-layout row wrap style="height: auto !important;">
        <v-flex xs12 md6>
          <record-transcript></record-transcript>
        </v-flex>
        <v-flex xs12 md6>
          <record-list></record-list>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex class="shrink" v-if="recordings.length && credentials.valid">
      <record-player></record-player>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Bus from '../js/bus';
import RecordMessages from './RecordView/RecordMessages';
import RecordControl from './RecordView/RecordControl';
import RecordNotifications from './RecordView/RecordNotifications';
import RecordList from './RecordView/RecordList';
import RecordTranscript from './RecordView/RecordTranscript';
import RecordPlayer from './RecordView/RecordPlayer';

export default {
  components: {
    RecordMessages,
    RecordControl,
    RecordNotifications,
    RecordList,
    RecordTranscript,
    RecordPlayer,
  },
  mounted() {
    this.getRecordings();
    Bus.$on('recordingSaved', this.getRecordings);
  },
  computed: {
    ...mapGetters({
      recordings: 'getRecordings',
      credentials: 'getCredentials',
    }),
  },
  methods: {
    ...mapActions({
      getRecordings: 'getRecordings',
    }),
  },
};
</script>
