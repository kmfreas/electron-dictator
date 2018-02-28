<template>
  <v-layout row wrap justify-center id="wrapper">
    <v-flex md8>
      <record-control></record-control>
    </v-flex>
  </v-layout>
</template>

<script>
import RecordControl from './RecordView/RecordControl';

export default {
  components: {
    RecordControl,
  },
};
</script>
