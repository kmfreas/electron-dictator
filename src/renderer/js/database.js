import Datastore from 'nedb';
import path from 'path';
// eslint-disable-next-line
import { remote, Data } from 'electron';

const Database = {
  db: {},
  init() {
    this.db.recordings = new Datastore({
      filename: path.join(remote.app.getPath('userData'), '/user-config/recordings.db'),
      autoload: true,
      timestampData: true,
    });
    this.db.options = new Datastore({
      filename: path.join(remote.app.getPath('userData'), '/user-config/options.db'),
      autoload: true,
      timestampData: true,
    });
  },
  recordings: {
    insert(title, audioFile, textFile) {
      return new Promise((resolve) => {
      const item = {
        title,
        audioFile,
        textFile,
      };
        Database.db.recordings.insert(item, (err, doc) => {
          if (err) throw err;
          resolve(doc);
        });
      });
    },
    all() {
      return new Promise((resolve) => {
        Database.db.recordings.find({}, (err, docs) => {
          resolve(docs);
        });
      });
    },
  },
  options: {
    update(field, value) {
      this.get(field).then((data) => {
        if (data.length) {
          Database.db.options.update({
            field,
          }, {
            field,
            value,
          });
        } else {
          Database.db.options.insert({
            field,
            value,
          });
        }
      });
    },
    get(field) {
      return new Promise((resolve) => {
        Database.db.options.find({
          field,
        }, (err, docs) => {
          if (docs.length && docs[0].value) {
            resolve(docs[0].value);
          } else {
            resolve('');
          }
        });
      });
    },
  },
};


export default Database;
