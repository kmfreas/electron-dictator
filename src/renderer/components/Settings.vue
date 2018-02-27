<template>
  <div>
    <div class="field">
      <div class="control">
        <input class="input" type="text" v-model="projectId" placeholder="Google Speech Project ID">
      </div>
    </div>
    <div class="file has-name is-fullwidth field">
      <label class="file-label">
        <input class="file-input" type="file" name="credentials" @change="onFileChange">
        <span class="file-cta">
          <span class="file-icon">
            <font-awesome-icon icon="upload" />
          </span>
          <span class="file-label">
            Choose a file…
          </span>
        </span>
        <span class="file-name">
          <span v-if="file && file.name">{{file.name}}</span>
        </span>
      </label>
    </div>
    <div class="field">
      <div class="control">
        <button class="button is-link" @click="save">Save</button>
      </div>
    </div>
  </div>
</template>

<script>
import path from 'path';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
// eslint-disable-next-line
import { remote } from 'electron';
import Database from '../api/database';
const fs = require('fs');

export default {
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      projectId: null,
      file: null,
    };
  },
  mounted() {
    Database.options.get('speech_project_id').then((projectId) => {
      this.projectId = projectId;
    });
  },
  methods: {
    onFileChange(e) {
      const file = e.target.files || e.dataTransfer.files;
      if (!file.length) {
        return;
      }
      this.file = file[0];
    },
    save() {
      Database.options.update('speech_project_id', this.projectId);
      if (this.file && this.file.path) {
        fs.createReadStream(this.file.path).pipe(fs.createWriteStream(path.join(remote.app.getPath('userData'), '/credentials.json')));
      }
    },
  },
};
</script>
