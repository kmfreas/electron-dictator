import fs from 'fs-extra';
import path from 'path';
import Database from '../../js/database';

const state = {
  recordings: [],
  currentRecording: {
    author: ' ',
    url: path.join('static/blank.mp3'),
    title: ' ',
    transcript: null,
  },
};

const getters = {
  getRecordings() {
    return state.recordings;
  },
  getCurrentRecording() {
    return state.currentRecording;
  },
  getProcessingRecordings() {
    return state.recordings.filter(r => r.processing);
  },
};

const mutations = {
  saveRecordings(context, data) {
    context.recordings = data;
  },
  setCurrentRecording(context, record) {
    Object.keys(record).filter(key => key in state.currentRecording).forEach((key) => {
      state.currentRecording[key] = record[key];
    });
    state.recordings.forEach((r) => {
      r.active = r._id === record._id;
    });
  },
};

const actions = {
  getRecordings(context) {
    return new Promise((resolve) => {
      Database.recordings.all().then((all) => {
        all.forEach((r) => {
          r.active = false;
          r.error = false;
        });
        context.commit('saveRecordings', all);
        resolve();
      });
    });
  },
  loadRecording(context, index) {
    const record = state.recordings[index];

    Promise.all([
      fs.readFile(record.audioFile),
      fs.readFile(record.textFile, 'utf8'),
    ]).then(([audio, text]) => {
      const blob = new window.Blob([new Uint8Array(audio)]);
      record.url = URL.createObjectURL(blob);
      record.transcript = text;
      context.commit('setCurrentRecording', record);
    });
  },
};


export default {
  state,
  getters,
  mutations,
  actions,
};
