<template>
      <record-control></record-control>
        <record-list></record-list>
      </div>
    </v-flex>
    <v-flex class="sub-footer">
      <record-control></record-control>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions } from 'vuex';
import Bus from '../js/bus';
import RecordControl from './RecordView/RecordControl';
import RecordList from './RecordView/RecordList';
import RecordPlayer from './RecordView/RecordPlayer';

export default {
  components: {
    RecordControl,
    RecordList,
    RecordPlayer,
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
.sub-footer {
  align-self: flex-end;
  width: 100%;
  flex: 0;
}

.main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.main .card {
  width: 100%;    
}
</style>
