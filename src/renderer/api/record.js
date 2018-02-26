import path from 'path';
// eslint-disable-next-line
import { remote } from 'electron';
import fs from 'fs';
import record from 'node-record-lpcm16';

export default {
  currentFile: '',
  getPath() {
    return path.join(remote.app.getPath('userData'), `/recordings/${this.currentFile}`);
  },
  start() {
    this.currentFile = 'test.wav';
    const fileName = this.getPath();
    const file = fs.createWriteStream(fileName, { encoding: 'binary' });

    record.start({
      sampleRate: 44100,
      verbose: true,
    }).pipe(file);
  },
  stop() {
    record.stop();
    this.currentFile = '';
  },
  getRecordings() {

  },
};
