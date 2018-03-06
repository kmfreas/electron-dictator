<template>
  <v-layout column justify-center>
    <v-flex style="height: 100%">
      <div class="main">
        <record-list></record-list>
      </div>
    </v-flex>
    <v-flex class="sub-footer">
      <record-control></record-control>
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
