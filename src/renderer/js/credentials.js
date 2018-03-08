import path from 'path';
// eslint-disable-next-line
import { remote } from 'electron';
import fs from 'fs';
import Database from './database';

export default {
  check() {
    return new Promise((resolve) => {
      const errors = [];
      if (!fs.existsSync(path.join(remote.app.getPath('userData'), '/user-config/credentials.json'))) {
        errors.push('Your Google Speech API credentials file is missing.');
      }

      Database.options.get('bucket_name').then((name) => {
        if (!name) {
          errors.push('Your Google Cloud Storage bucket name is missing.');
        }
        resolve(errors);
      });
    });
  },
  save(file, bucketName) {
    Database.options.update('bucket_name', bucketName);
    if (file && file.path) {
      fs.createReadStream(file.path).pipe(fs.createWriteStream(path.join(remote.app.getPath('userData'), '/user-config/credentials.json')));
    }
  },
};
