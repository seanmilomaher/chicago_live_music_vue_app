<template>
  <div class="events-index">
    <h1>Events</h1>
    <div v-for="event in events" :key="event.id">
      <h3>{{ event.name }}</h3>
      <img :src="event.image" alt="" />
      <p>{{ event.venue }}</p>
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
      events: [],
    };
  },
  created: function() {
    axios.get("/api/events").then(response => {
      console.log(response.data);
      this.events = response.data;
    });
  },
};
</script>
