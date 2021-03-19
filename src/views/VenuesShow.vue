<template>
  <div class="venues-show">
    <h1>{{ venue.name }}</h1>
    <img :src="venue.image" alt="" />
    <p>{{ venue.address }}</p>
    <div v-if="isCurrentVenue()">
      <router-link :to="`${venue.id}/edit`">
        <button>Edit</button>
      </router-link>
      <router-link :to="`/events/new`">
        <button>New Event</button>
      </router-link>
    </div>
    <h3>Upcoming Events</h3>
    <div v-for="event in venue.events" :key="event.id">
      <router-link :to="`/events/${event.id}`">
        <h4>{{ event.name }}</h4>
        <img :src="event.image" alt="" />
      </router-link>
      <p>{{ date(event.date) }}</p>
      <p>{{ time(event.start_time) }}</p>
      <p>{{ time(event.end_time) }}</p>
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
      venue: {},
    };
  },
  created: function() {
    axios.get(`/api/venues/${this.$route.params.id}`).then(response => {
      console.log(response.data);
      this.venue = response.data;
    });
  },
  methods: {
    time: function(time) {
      return moment(time).format("LT");
    },
    date: function(date) {
      return moment(date).format("LL");
    },
    isCurrentVenue: function() {
      if (localStorage.venue_id == this.venue.id) {
        return true;
      }
    },
  },
};
</script>
