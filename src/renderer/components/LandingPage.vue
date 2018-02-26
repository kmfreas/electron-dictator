<template>
  <div>
    <record-control></record-control>
    <recordings></recordings>
  </div>
</template>

<script>
import RecordControl from './RecordControl';
import Recordings from './Recordings';
export default {
  name: 'landing-page',
  components: {
    RecordControl,
    Recordings,
  },
  methods: {
  },
};
</script>
<style lang="scss">

</style>
