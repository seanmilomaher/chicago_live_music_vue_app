<template>
  <div class="venues-show">
    <h1>{{ venue.name }}</h1>
    <img :src="venue.image" alt="" />
    <p>{{ venue.address }}</p>
    <router-link :to="`${venue.id}/edit`">
      <button>Edit</button>
    </router-link>
    <h3>Upcoming Events</h3>
    <div v-for="event in venue.events" :key="event.id">
      <h4>{{ event.name }}</h4>
      <img :src="event.image" alt="" />
      <p>{{ event.date }}</p>
      <p>{{ event.start_time }}</p>
      <p>{{ event.end_time }}</p>
      <p>{{ event.cover }}</p>
      <p>{{ event.age_limit }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

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
};
</script>
