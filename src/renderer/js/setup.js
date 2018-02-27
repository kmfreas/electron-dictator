import path from 'path';
// eslint-disable-next-line
import { remote } from 'electron';
import fs from 'fs';
import Database from './database';
import Record from './record';

export default (() => {
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
})();
