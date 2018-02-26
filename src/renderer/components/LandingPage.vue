<template>
  <div class="columns">
    <div class="column">
      <record-control></record-control>
    </div>
    <div class="column">
      <stream></stream>
    </div>
  </div>
</template>

<script>
import RecordControl from './RecordControl';
import Stream from './Stream';

export default {
  name: 'landing-page',
  components: {
    RecordControl,
    Stream,
  },
  methods: {},
};
</script>
<style lang="scss">

</style>
