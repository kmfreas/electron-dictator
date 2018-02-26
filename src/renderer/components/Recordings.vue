<template>
  <div>
    <h1 class="title">Your Recordings</h1>
    <table class="table">
      <thead>
        <tr>
          <th>
            Title
          </th>
          <th>
            Date
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="record in recordings" :key="record._id">
          <td>
            {{record.title}}
          </td>
          <td>
            {{record.createdAt | date}}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import moment from 'moment';
import Database from '../api/database';

export default {
  data() {
    return {
      recordings: [],
    };
  },
  mounted() {
    this.getRecordings();
  },
  filters: {
    date(val) {
      return moment(val).format('dddd, MMMM Do YYYY, h:mm:ss a');
    },
  },
  methods: {
    getRecordings() {
      Database.recordings.all().then((all) => {
        this.recordings = all;
      });
    },
  },
};
</script>
