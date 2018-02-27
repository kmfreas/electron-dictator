import path from 'path';
// eslint-disable-next-line
import { remote } from 'electron';
import fs from 'fs';
import Database from './api/database';
import Record from './api/record';

export default {
  init() {
    const paths = [
      path.join(remote.app.getPath('userData'), '/recordings'),
      path.join(remote.app.getPath('userData'), '/user-config'),
    ];

    paths.forEach((p) => {
      if (!fs.existsSync(p)) {
        fs.mkdirSync(p);
      }
    });

    Database.init();
    Record.init();
  },
  verify() {
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
};
