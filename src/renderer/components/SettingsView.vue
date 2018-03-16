<template>
  <v-layout column>
    <v-card v-if="credentials.data.saved" class="mb-3" color="warning" v-for="error in credentials.errors" :key="error">
      <v-card-text>
        <b>{{error}}</b>
      </v-card-text>
    </v-card>
    <v-card>
      <v-toolbar dark>
        <v-toolbar-title>Setup</v-toolbar-title>
      </v-toolbar>
      <v-card-text v-show="credentials.valid && !showForm">
        Your credentials are correctly setup.
      </v-card-text>
      <v-slide-y-transition>
        <v-card-text v-show="showForm">
          <p class="headline">Instructions</p>
          <p class="mb-0">
            Create a project on Google Cloud Console and enable the speech API. <v-icon style="cursor:pointer; vertical-align: text-top" class="body-1" color="primary" @click="open('https://cloud.google.com/speech/docs/quickstart')">open_in_new</v-icon>
          </p>
          <p>
            Create a service account key and add the key below. <v-icon style="cursor:pointer; vertical-align: text-top" class="body-1" color="primary" @click="open('https://console.cloud.google.com/apis/credentials/serviceaccountkey')">open_in_new</v-icon>
          </p>
          <p class="headline mb-0">Add Credentials</p>
          <v-form v-model="valid" ref="form" lazy-validation>
            <file-input @fileAdded="handleFile" v-model="fileName" label="Google Speech Service Account Key File" :required="true" :rules="fileNameRules" accept=".json"></file-input>
            <v-text-field prepend-icon="vpn_key" label="Google Cloud Storage Bucket Name" v-model="bucketName" :rules="bucketNameRules" required></v-text-field>
          </v-form>
        </v-card-text>
      </v-slide-y-transition>
      <v-card-actions>
        <v-btn dark @click="saveSettings" color="primary" v-if="showForm" :loading="loading" :disabled="loading">
          Save
        </v-btn>
        <v-btn @click="showForm = true" color="primary" v-if="!showForm">
          Edit
        </v-btn>
        <v-btn v-if="showForm && credentials.valid" @click="showForm = false" :disabled="loading">
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-snackbar :timeout="6000" :bottom="true" v-model="showSnackbar">
      Settings saved
      <v-btn flat color="primary" @click.native="showSnackbar = false">Close</v-btn>
    </v-snackbar>
  </v-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import path from 'path';
// eslint-disable-next-line
import { remote } from 'electron';
import FileInput from './elements/FileInput';

export default {
  components: {
    FileInput,
  },
  data() {
    return {
      file: null,
      fileName: null,
      bucketName: null,
      fileNameRules: [
        v => !!v || 'Credentials file is required. Must be a .json file',
      ],
      bucketNameRules: [
        v => !!v || 'BucketName is required',
      ],
      showSnackbar: false,
      valid: true,
      showForm: null,
      loading: false,
    };
  },
  computed: {
    ...mapGetters({
      credentials: 'getCredentials',
    }),
  },
  mounted() {
    this.showForm = !this.credentials.valid;
    this.bucketName = this.credentials.data.bucket;
    this.fileName = this.credentials.data.file;
  },
  methods: {
    handleFile(files) {
      this.file = files[0];
    },
    handleCredentials(data) {
      this.errors = data.errors;
      this.show = !!data.errors.length;
      this.credentialsValid = !this.show;
      this.bucketName = data.credentials.bucket;
      this.fileName = data.credentials.file;
    },
    saveSettings() {
      const credsFile = path.join(remote.app.getPath('userData'), '/user-config/credentials.json');

      if (this.file instanceof File === false && credsFile !== this.fileName) {
        this.fileName = '';
        this.file = null;
        return;
      }

      if (this.$refs.form.validate()) {
        this.loading = true;
        this.store({
          file: this.file && this.file.path ? this.file : null,
          bucketName: this.bucketName,
        })
          .then(() => this.loadCredentials())
          .then(() => {
            setTimeout(() => {
              this.loading = false;
              this.showSnackbar = this.credentials.valid;
              this.showForm = !this.credentials.valid;
            }, 1000);
          });
      }
    },
    open(link) {
      this.$electron.shell.openExternal(link);
    },
    ...mapActions({
      store: 'storeCredentials',
      loadCredentials: 'loadCredentials',
    }),
  },
};
</script>
