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
  speech: null,
  storage: null,
  bucket: null,
  init() {
    return new Promise((resolve) => {
      const credentials = path.join(remote.app.getPath('userData'), '/user-config/credentials.json');

      Database.options.get('bucket_name').then((name) => {
        this.bucket = name;
      });

      if (fs.existsSync(credentials)) {
        this.speech = new speech.SpeechClient({
          keyFilename: credentials,
        });
        this.storage = new Storage({
          keyFilename: credentials,
        });
        const watchAuth = setInterval(() => {
          if (this.speech && this.storage) {
            clearInterval(watchAuth);
            resolve();
          }
        }, 50);
      } else {
        resolve();
      }
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
    const audioFile = `${this.getPath()}.wav`;
    const audioFileName = `${this.currentFileName}.wav`;
    const textFile = `${this.getPath()}.txt`;

    if (!dbTitle) {
      dbTitle = 'Untitled';
    }

    record.stop();

    Bus.$emit('processingRecording', dbTitle);

    this.uploadFile(audioFile)
      .then(() => this.getTranscription(audioFileName))
      .then(() => Database.recordings.insert(dbTitle, audioFile, textFile, duration))
      .then((doc) => {
        Bus.$emit('recordingSaved', doc);
      })
      .catch((error) => {
        Bus.$emit('recordingError', { error, title: dbTitle });
        fs.unlink(audioFile, (err) => {
          if (err) throw err;
        });
      });
  },
  uploadFile(file) {
    return new Promise((resolve, reject) => {
      this.storage
        .bucket(this.bucket)
        .upload(file)
        .then(() => {
          resolve();
        })
        .catch(() => {
          reject('upload');
        });
    });
  },
  getTranscription(file) {
    return new Promise((resolve, reject) => {
      this.speech
        .longRunningRecognize({
          config: {
            languageCode: 'en-US',
            encoding: 'LINEAR16',
            sampleRateHertz: 44100,
          },
          audio: {
            uri: `gs://${this.bucket}/${file}`,
          },
        })
        .then((data) => {
          const response = data[0];
          const operation = response;
          operation.on('progress', (metadata, apiResponse) => {
            if (apiResponse.result === null && apiResponse.done) {
              reject('no-transcript');
            }
          });
          return operation.promise();
        })
        .then((data) => {
          const response = data[0];
          const transcription = response.results.map(result => result.alternatives[0].transcript).join('\n');
          fs.writeFile(`${this.getPath()}.txt`, transcription, (error) => {
            if (error) {
              reject('transcript-save-fail');
            }
            resolve();
          });
        })
        .catch(() => {
          reject('transcript');
        });
    });
  },
};
