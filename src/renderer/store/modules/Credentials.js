import path from 'path';
// eslint-disable-next-line
import { remote } from 'electron';
import fs from 'fs-extra';
import merge from 'deepmerge';
import Database from '../../js/database';
import Record from '../../js/record';

const credsFormat = {
  errors: [],
  data: {
    saved: null,
    file: null,
    bucket: null,
  },
  valid: null,
  loaded: null,
};

const state = {
  credentials: merge({}, credsFormat),
};

const getters = {
  getCredentials() {
    return state.credentials;
  },
};

const mutations = {
  saveCredentials(context, data) {
    context.credentials = merge(credsFormat, data);
  },
};

const actions = {
  storeCredentials(context, data) {
    return new Promise((resolve) => {
      const filepath = path.join(remote.app.getPath('userData'), '/user-config/credentials.json');
      Promise.all([
        Database.options.update('bucket_name', data.bucketName),
        Database.options.update('credentials_saved', true),
      ]).then(() => {
        if (data.file && data.file.path) {
          fs.copy(data.file.path, filepath).then(() => resolve());
        } else {
          resolve();
        }
      });
    });
  },
  loadCredentials(context) {
    return new Promise((resolve) => {
      const credsFile = path.join(remote.app.getPath('userData'), '/user-config/credentials.json');
      Promise.all([
        Database.options.get('credentials_saved'),
        Database.options.get('bucket_name'),
        fs.existsSync(credsFile),
        Record.init(),
      ]).then(([saved, bucket, file]) => {
        const response = {
          errors: [],
          data: {
            saved,
            file: file ? credsFile : '',
            bucket,
          },
          valid: null,
          loaded: true,
        };

        if (!file) {
          response.errors.push('Google Speech API credentials file is missing');
        }
        if (!Record.speech || !Record.speech.auth.authClient) {
          response.errors.push('Google Speech API Unauthenticated');
        }

        if (!bucket) {
          response.errors.push('Google Cloud Storage bucket name is missing');
        }

        response.valid = !response.errors.length;
        resolve(response);
        context.commit('saveCredentials', response);
      });
    });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
