<template>
  <v-layout column>
    <v-card>
      <v-toolbar color="cyan" dark>
        <v-toolbar-title>Setup</v-toolbar-title>
      </v-toolbar>
      <v-card-text v-show="!show">
        Your credentials are correctly setup.
      </v-card-text>
      <v-slide-y-transition>
        <v-card-text v-show="show">
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
        <v-btn dark @click="saveSettings" color="primary" v-if="show">
          Save
        </v-btn>
        <v-btn @click="show = !show" color="primary" v-if="!show">
          Edit
        </v-btn>
        <v-btn v-if="show && credentialsValid" @click="show = !show">
          Cancel
        </v-btn>
      </v-card-actions>
      <v-snackbar :timeout="6000" :bottom="true" v-model="showSnackbar">
        Settings saved
        <v-btn flat color="primary" @click.native="showSnackbar = false">Close</v-btn>
      </v-snackbar>
    </v-card>
  </v-layout>
</template>

<script>
import FileInput from './elements/FileInput';
import Credentials from '../js/credentials';
import Record from '../js/record';

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
      show: null,
      credentialsValid: null,
    };
  },
  mounted() {
    Credentials.check().then((errors) => {
      this.show = !!errors.length;
      this.credentialsValid = !this.show;
    });
  },
  methods: {
    handleFile(files) {
      this.file = files[0];
    },
    saveSettings() {
      if (this.file instanceof File === false) {
        this.fileName = '';
        this.file = null;
      }

      if (this.$refs.form.validate()) {
        Credentials.save(this.file, this.bucketName);
        this.showSnackbar = true;
        this.show = false;
        this.credentialsValid = true;
        Record.init();
      }
    },
    open(link) {
      this.$electron.shell.openExternal(link);
    },
  },
};
</script>
