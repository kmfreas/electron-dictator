import path from 'path';
// eslint-disable-next-line
import { remote } from 'electron';
import fs from 'fs';
import record from './api/record';
import database from './api/database';

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

    database.init();
    record.init();
  },
};
