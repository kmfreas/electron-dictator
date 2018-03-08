import path from 'path';
// eslint-disable-next-line
import { remote } from 'electron';
import fs from 'fs';
import record from 'node-record-lpcm16';
import moment from 'moment';
import Database from './database';
import Bus from './bus';
const speech = require('@google-cloud/speech');
const Storage = require('@google-cloud/storage');

export default {
  currentFileName: '',
  client: null,
  storage: null,
  bucket: null,
  init() {
    const credentials = path.join(remote.app.getPath('userData'), '/user-config/credentials.json');
    if (fs.existsSync(credentials)) {
      this.client = new speech.SpeechClient({
        keyFilename: credentials,
      });
      this.storage = new Storage({
        keyFilename: credentials,
      });
    }
    Database.options.get('bucket_name').then((name) => {
      this.bucket = name;
    });
  },
  getPath() {
    return path.join(remote.app.getPath('userData'), `/recordings/${this.currentFileName}`);
  },
  start() {
    this.currentFileName = moment().format('x');
    const fileName = `${this.getPath()}.wav`;
    const file = fs.createWriteStream(fileName, { encoding: 'binary' });

    record.start({
      encoding: 'LINEAR16',
      sampleRate: 44100,
      threshold: 0,
    }).pipe(file);
  },
  stop(title, duration) {
    let dbTitle = title;
    if (!dbTitle) {
      dbTitle = 'Untitled';
    }
    record.stop();
    const file = `${this.getPath()}.wav`;
    const filename = this.currentFileName;
    Database.recordings.insert(dbTitle, `${this.getPath()}.wav`, `${this.getPath()}.txt`, duration).then((doc) => {
      Bus.$emit('recordingSaved');
      if (this.client !== null) {
        this.uploadFile(file).then(() => {
          setTimeout(() => {
            this.getTranscription(filename, doc._id); // eslint-disable-line no-underscore-dangle
          }, 0);
        }, (err) => {
          throw err;
        });
      }
    });
  },
  uploadFile(file) {
    return new Promise((resolve, reject) => {
      this.storage
        .bucket(this.bucket)
        .upload(file)
        .then(() => resolve())
        .catch(err => reject(err));
    });
  },
  getTranscription(file, id) {
    this.client
      .longRunningRecognize({
        config: {
          languageCode: 'en-US',
          encoding: 'LINEAR16',
          sampleRateHertz: 44100,
        },
        audio: {
          uri: `gs://${this.bucket}/${file}.wav`,
        },
      })
      .then((data) => {
        const response = data[0];
        const operation = response;
        // Get a Promise representation of the final result of the job
        return operation.promise();
      })
      .then((data) => {
        const response = data[0];
        const transcription = response.results
          .map(result => result.alternatives[0].transcript)
          .join('\n');
        fs.writeFile(`${this.getPath()}.txt`, transcription, (error) => {
          if (error) throw error;
          Bus.$emit('transcriptionSaved', id);
        });
      })
      .catch();
  },
};
