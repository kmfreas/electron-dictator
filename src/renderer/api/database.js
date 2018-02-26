import Datastore from 'nedb';
import path from 'path';
// eslint-disable-next-line
import { remote, Data } from 'electron';

const Database = {
  db: {},
  init() {
    this.db.recordings = new Datastore({
      filename: path.join(remote.app.getPath('userData'), '/recordings.db'),
      autoload: true,
      timestampData: true,
    });
  },
  recordings: {
    insert(title, file) {
      const item = {
        title,
        file,
      };
      Database.db.recordings.insert(item);
    },
    all() {
      return new Promise((resolve) => {
        Database.db.recordings.find({}, (err, docs) => {
          resolve(docs);
        });
      });
    },
  },
};


export default Database;
