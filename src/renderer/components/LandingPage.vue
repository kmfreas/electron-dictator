<template>
  <div class="section">
    <div class="container">
      <div class="columns">
        <div class="column">
          <record-control></record-control>
          <recordings></recordings>
        </div>
        <div class="column">
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RecordControl from './RecordControl';
import Recordings from './Recordings';
import Stream from './Stream';

export default {
  name: 'landing-page',
  components: {
    RecordControl,
    Recordings,
    Stream,
  },
  methods: {
  },
};
</script>
<style lang="scss">

</style>
