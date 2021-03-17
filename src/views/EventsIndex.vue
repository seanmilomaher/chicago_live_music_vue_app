<template>
  <div class="events-index">
    <h1>Events</h1>
    <div>
      Search:
      <input type="text" v-model="filter" />
    </div>
    <div v-for="event in filterBy(events, filter)" :key="event.id">
      <router-link :to="`/events/${event.id}`">
        <h3>{{ event.name }}</h3>
        <img :src="event.image" alt="" />
      </router-link>
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
import Vue2Filters from "vue2-filters";

export default {
  mixins: [Vue2Filters.mixin],
  data: function() {
    return {
      events: [],
      filter: "",
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
