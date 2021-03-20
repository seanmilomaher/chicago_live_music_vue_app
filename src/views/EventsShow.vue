<template>
  <div class="events-show">
    <h1>{{ event.name }}</h1>
    <img :src="event.image" alt="" />
    <router-link :to="`/venues/${event.venue_id}`">
      <p>{{ event.venue.name }}: {{ event.venue.address }}</p>
    </router-link>
    <p>{{ formattedDate(event.date) }}</p>
    <p>{{ formattedTime(event.start_time) }}</p>
    <p>{{ formattedTime(event.end_time) }}</p>
    <p>{{ event.cover }}</p>
    <p>{{ event.age_limit }}</p>
    <div v-if="isCurrentVenue()">
      <router-link :to="`${event.id}/edit`">
        <button>Edit</button>
      </router-link>
    </div>
    <h3>Bands</h3>
    <div v-for="band in event.bands" :key="band.id">
      <router-link :to="`/bands/${band.id}`">
        <h4>{{ band.name }}</h4>
        <img :src="band.image" alt="" />
      </router-link>
      <p>{{ band.from_city }}</p>
      <p>{{ band.from_state }}</p>
      <p>{{ formattedTime(band.start_time) }}</p>
      <p>{{ formattedTime(band.end_time) }}</p>
      <p>{{ band.bio }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  data: function() {
    return {
      event: {
        venue: {},
      },
    };
  },
  created: function() {
    axios.get(`/api/events/${this.$route.params.id}`).then(response => {
      console.log(response.data);
      this.event = response.data;
      console.log(this.event.start_time);
    });
  },
  methods: {
    formattedTime: function(time) {
      return moment(time).format("LT");
    },
    formattedDate: function(date) {
      return moment(date).format("LL");
    },
    isCurrentVenue: function() {
      if (localStorage.venue_id == this.event.venue_id) {
        return true;
      }
    },
  },
};
</script>
