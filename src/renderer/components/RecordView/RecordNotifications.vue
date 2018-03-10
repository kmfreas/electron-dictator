<template>
  <v-flex v-if="processing.length">
    <v-btn class="ml-0 mt-0 mb-0" :color="record.error ? 'error' : ''" :disabled="!record.error" depressed v-for="(record, index) in processing" :key="index">
      <span class="btn__content pa-0" v-if="!record.error">
        <v-progress-circular indeterminate color="white" size="20"></v-progress-circular>
        <span class="ml-2">Processing&nbsp;</span>
        <span>
          <b class="white--text">{{record.title}}</b>
        </span>
      </span>
      <v-icon left dark>close</v-icon>
      <span class="btn__content pa-0" v-if="record.error">
        {{record.title}}
      </span>
    </v-btn>
  </v-flex>
</template>

<script>
import Bus from '../../js/bus';

export default {
  data() {
    return {
      processing: [],
    };
  },
  mounted() {
    Bus.$on('processingRecording', (title) => {
      this.processing.push({ title, error: false });
    });
    Bus.$on('recordingSaved', (record) => {
      const index = this.processing.indexOf(record.title);
      if (index > -1) {
        this.processing.splice(index, 1);
      }
    });
    Bus.$on('recordingError', (data) => {
      let msg = null;
      const index = this.processing.findIndex(r => r.title === data.title);
      switch (data.error) {
        case 'upload':
          msg = `Error uploading ${data.title}`;
          break;
        case 'no-transcript':
          msg = `Transcription empty for ${data.title}`;
          break;
        case 'transcript':
          msg = `Could not get transcript for ${data.title}`;
          break;
        case 'transcript-save-fail':
          msg = `Could not save transcript for ${data.title}`;
          break;
        default:
      }
      this.processing[index].error = true;
      this.processing[index].title = msg;
    });
  },
};
</script>

<style>
.notification {
  display: flex;
  align-items: center;
}

.notification span {
  display: block;
}
</style>
