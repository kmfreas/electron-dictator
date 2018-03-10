import path from 'path';
// eslint-disable-next-line
import { remote } from 'electron';
import fs from 'fs-extra';
import Database from './database';
import Record from './record';

export default {
  check() {
    return new Promise((resolve) => {
      const response = {
        errors: [],
        credentials: {
          saved: null,
          file: null,
          bucket: null,
        },
      };
      const credsFile = path.join(remote.app.getPath('userData'), '/user-config/credentials.json');
      Promise.all([
        Database.options.get('credentials_saved'),
        Database.options.get('bucket_name'),
        fs.existsSync(credsFile),
        Record.init(),
      ]).then(([saved, bucket, file]) => {
        response.credentials.saved = saved;
        response.credentials.file = file ? credsFile : '';
        response.credentials.bucket = bucket;
        if (!file) {
          response.errors.push('Google Speech API credentials file is missing');
        }
        if (!Record.speech || !Record.speech.auth.authClient) {
          response.errors.push('Google Speech API Unauthenticated');
        }

        if (!bucket) {
          response.errors.push('Google Cloud Storage bucket name is missing');
        }
        resolve(response);
      });
    });
  },
  save(file, bucketName) {
    return new Promise((resolve) => {
      Database.options.update('bucket_name', bucketName);
      Database.options.update('credentials_saved', true);
      if (file && file.path) {
        fs.createReadStream(file.path)
          .pipe(fs.createWriteStream(path.join(remote.app.getPath('userData'), '/user-config/credentials.json')))
          .then(resolve());
      } else {
        resolve();
      }
    });
  },
};
