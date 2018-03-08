<template>
  <v-layout column justify-center fill-height>
    <v-flex>
      <record-control></record-control>
    </v-flex>
    <v-flex fill-height d-flex>
      <v-layout row wrap style="height: auto !important;">
        <v-flex xs12 sm6>
          <record-transcript></record-transcript>
        </v-flex>
        <v-flex xs12 sm6>
          <record-list></record-list>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex class="sub-footer">
      <record-player></record-player>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions } from 'vuex';
import Bus from '../js/bus';
import RecordControl from './RecordView/RecordControl';
import RecordList from './RecordView/RecordList';
import RecordTranscript from './RecordView/RecordTranscript';
import RecordPlayer from './RecordView/RecordPlayer';

export default {
  components: {
    RecordControl,
    RecordList,
    RecordTranscript,
    RecordPlayer,
  },
  mounted() {
    this.getRecordings();
    Bus.$on('recordingSaved', this.getRecordings);
  },
  methods: {
    ...mapActions({
      getRecordings: 'getRecordings',
    }),
  },
};
</script>

<style>
/* .sub-footer {
  align-self: flex-end;
  width: 100%;
  flex: 0;
} */

.main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.main

.main .card {
  width: 100%;    
}
</style>
