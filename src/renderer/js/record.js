import path from 'path';
// eslint-disable-next-line
import { remote } from 'electron';
import fs from 'fs';
import record from 'node-record-lpcm16';
import moment from 'moment';
import Database from './database';
import Bus from './bus';
const speech = require('@google-cloud/speech');

export default {
  currentFileName: '',
  client: null,
  init() {
    const credentials = path.join(remote.app.getPath('userData'), '/user-config/credentials.json');
    if (fs.existsSync(credentials)) {
      this.client = new speech.SpeechClient({
        keyFilename: credentials,
      });
    }
  },
  getPath() {
    return path.join(remote.app.getPath('userData'), `/recordings/${this.currentFileName}`);
  },
  start() {
    this.currentFileName = moment().format();
    const fileName = `${this.getPath()}.wav`;
    const file = fs.createWriteStream(fileName, { encoding: 'binary' });

    record.start({
      sampleRate: 44100,
      verbose: true,
    }).pipe(file);
  },
  stop(title) {
    let dbTitle = title;
    if (!dbTitle) {
      dbTitle = this.currentFileName;
    }
    record.stop();
    Database.recordings.insert(dbTitle, `${this.getPath()}.wav`, `${this.getPath()}.txt`).then((doc) => {
      Bus.$emit('recordingSaved');
    if (this.client !== null) {
      this.getTranscription();
    }
    });
  },
  getTranscription() {
    this.client
      .longRunningRecognize({
        config: {
          languageCode: 'en-US',
        },
        audio: {
          content: fs.readFileSync(`${this.getPath()}.wav`).toString('base64'),
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
        });
      })
      .catch();
  },
};
