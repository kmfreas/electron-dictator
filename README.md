# Electron Transcriber

> A tool to provide transcriptions of your audio recordings

![screenshot](https://raw.githubusercontent.com/kmfreas/electron-transcriber/vuetify/docs/transcriber.jpg)

> Installation Requirements:
1) Install SOX. Via homebrew: ``` brew install sox ```
2) Create a Google Cloud Console project.
3) Enable Google Cloud Storage and Speech APIs for the project.
4) Create a Google Cloud service account, grant it access to Storage and Speech APIs, and [create](https://cloud.google.com/iam/docs/creating-managing-service-account-keys) a key via the console.
5) Create a bucket in Google Storage.
6) When prompted by Transcriber, insert the bucket name and the Cloud service account key.

[Download Mac App &rarr;](https://drive.google.com/uc?export=download&id=1OcESjxgVvZZdPuMMunctZ8B1yjufNe_r)


#### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build

# run unit & end-to-end tests
npm test


# lint all JS/Vue component files in `src/`
npm run lint

```

---

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue)@[1c165f7](https://github.com/SimulatedGREG/electron-vue/tree/1c165f7c5e56edaf48be0fbb70838a1af26bb015) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).
