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

      Database.options.get('speech_project_id').then((id) => {
        if (!id) {
          errors.push('Your Google Speech API project ID is missing.');
        }
        resolve(errors);
      });
    });
  },
  save(file, projectId) {
    Database.options.update('speech_project_id', projectId);
    if (file && file.path) {
      fs.createReadStream(file.path).pipe(fs.createWriteStream(path.join(remote.app.getPath('userData'), '/user-config/credentials.json')));
    }
  },
};
