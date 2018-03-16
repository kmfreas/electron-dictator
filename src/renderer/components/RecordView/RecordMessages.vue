<template>
  <v-flex class="shrink">
    <v-card v-if="welcome || credentialErrors">
      <v-card-text v-if="welcome">
        Welcome to the Transcriber! Before you can begin transcribing audio, you must input your Google Cloud Speech and Storage API information.
      </v-card-text>
      <v-card-text v-if="credentialErrors">
        Credentials are misconfigured.
      </v-card-text>
      <v-card-actions>
        <v-btn @click="openSettings">
          <span v-if="credentialErrors">Fix&nbsp;</span><span v-if="welcome">Add&nbsp;</span> Credentials
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      credentials: 'getCredentials',
    }),
    welcome() {
      return this.credentials && !this.credentials.data.saved;
    },
    credentialErrors() {
      return this.credentials && this.credentials.data.saved && this.credentials.errors.length;
    },
  },
  methods: {
    openSettings() {
      this.$router.push('/settings');
    },
  },
};
</script>
