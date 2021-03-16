<template>
  <div class="events-show">
    <h1>{{ event.name }}</h1>
    <img :src="event.image" alt="" />
    <router-link :to="`/venues/${event.venue_id}`">
      <p>{{ event.venue.name }}: {{ event.venue.address }}</p>
    </router-link>
    <p>{{ event.date }}</p>
    <p>{{ event.start_time }}</p>
    <p>{{ event.end_time }}</p>
    <p>{{ event.cover }}</p>
    <p>{{ event.age_limit }}</p>
    <router-link :to="`${event.id}/edit`">
      <button>Edit</button>
    </router-link>
    <h3>Bands</h3>
    <div v-for="band in event.bands" :key="band.id">
      <router-link :to="`/bands/${band.id}`">
        <h4>{{ band.name }}</h4>
        <img :src="band.image" alt="" />
      </router-link>
      <p>{{ band.from_city }}</p>
      <p>{{ band.from_state }}</p>
      <p>{{ band.start_time }}</p>
      <p>{{ band.end_time }}</p>
      <p>{{ band.bio }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

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
    });
  },
};
</script>
