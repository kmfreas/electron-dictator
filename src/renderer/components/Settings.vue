<template>
  <div>
    <div class="field">
      <div class="control">
        <input class="input" type="text" v-model="key" placeholder="Google Speech API Key">
      </div>
    </div>
    <div class="field">
      <div class="control">
        <button class="button is-link" @click="saveKey">Save</button>
      </div>
    </div>
  </div>
</template>

<script>
import Database from '../api/database';

export default {
  data() {
    return {
      key: null,
    };
  },
  mounted() {
    Database.options.get('google_api_key').then((key) => {
      console.log(key);
      this.key = key;
    });
  },
  methods: {
    saveKey() {
      Database.options.update('google_api_key', this.key);
    },
  },
};
</script>
