<template>
  <v-layout row wrap>
    <v-flex md8>
      <record-control></record-control>
    </v-flex>
    <v-flex xs12 class="mt-5">
      <record-list></record-list>
    </v-flex>
  </v-layout>
</template>

<script>
import RecordControl from './RecordView/RecordControl';
import RecordList from './RecordView/RecordList';

export default {
  components: {
    RecordControl,
    RecordList,
  },
};
</script>
