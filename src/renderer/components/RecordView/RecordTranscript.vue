<template>
  <v-card height="100%">
    <v-card-text>
      {{record.transcript}}
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters({
      record: 'getCurrentRecording',
    }),
  },
};
</script>
