import path from 'path';
// eslint-disable-next-line
import { remote } from 'electron';
import fs from 'fs';

export default {
  check() {
    return new Promise((resolve) => {
      const errors = [];
      if (!fs.existsSync(path.join(remote.app.getPath('userData'), '/user-config/credentials.json'))) {
        errors.push('Your Google Speech API credentials file is missing.');
      }
      resolve(errors);
    });
  },
  save(file) {
    if (file && file.path) {
      fs.createReadStream(file.path).pipe(fs.createWriteStream(path.join(remote.app.getPath('userData'), '/user-config/credentials.json')));
    }
  },
};
