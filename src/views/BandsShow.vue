<template>
  <div class="bands-show">
    <h1>{{ band.name }}</h1>
    <img :src="band.image" alt="" />
    <p>{{ band.from_city }}</p>
    <p>{{ band.from_state }}</p>
    <p>{{ band.bio }}</p>
    <div v-if="loggedIn()">
      <router-link :to="`${band.id}/edit`">
        <button>Edit</button>
      </router-link>
    </div>
    <h3>Upcoming Events</h3>
    <div v-for="event in band.events" :key="event.id">
      <router-link :to="`/events/${event.id}`">
        <h4>{{ event.name }}</h4>
        <img :src="event.image" alt="" />
      </router-link>
      <p>{{ fomattedDate(event.date) }}</p>
      <p>{{ formattedTime(event.start_time) }}</p>
      <p>{{ formattedTime(event.end_time) }}</p>
      <p>{{ event.cover }}</p>
      <p>{{ event.age_limit }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  data: function() {
    return {
      band: {},
    };
  },
  created: function() {
    axios.get(`/api/bands/${this.$route.params.id}`).then(response => {
      console.log(response.data);
      this.band = response.data;
    });
  },
  methods: {
    formattedTime: function(time) {
      return moment(time, "LT").format("LT");
    },
    fomattedDate: function(date) {
      return moment(date).format("LL");
    },
    loggedIn: function() {
      return localStorage.jwt ? true : false;
    },
  },
};
</script>
