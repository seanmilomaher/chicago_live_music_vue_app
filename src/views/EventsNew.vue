<template>
  <div class="events-new">
    <form v-on:submit.prevent="createEvent()">
      <h1>New Event</h1>
      <ul>
        <li class="text-danger" v-for="error in errors" v-bind:key="error">
          {{ error }}
        </li>
      </ul>
      <div class="form-group">
        <label>Name:</label>
        <input type="text" class="form-control" v-model="name" />
      </div>
      <div class="form-group">
        <label>Image:</label>
        <input type="text" class="form-control" v-model="image" />
      </div>
      <div class="form-group">
        <label>Date:</label>
        <input type="text" class="form-control" v-model="date" />
      </div>
      <div class="form-group">
        <label>Start Time:</label>
        <input type="text" class="form-control" v-model="startTime" />
      </div>
      <div class="form-group">
        <label>End Time:</label>
        <input type="text" class="form-control" v-model="endTime" />
      </div>
      <div class="form-group">
        <label>Cover:</label>
        <input type="text" class="form-control" v-model="cover" />
      </div>
      <div class="form-group">
        <label>Age Limit:</label>
        <input type="text" class="form-control" v-model="ageLimit" />
      </div>
      <input type="submit" class="btn btn-primary" value="Create" />
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      name: "",
      image: "",
      date: "",
      startTime: "",
      endTime: "",
      cover: "",
      ageLimit: "",
      errors: [],
    };
  },
  methods: {
    createEvent: function() {
      var params = {
        name: this.name,
        image: this.image,
        date: this.date,
        start_time: this.startTime,
        end_time: this.endTime,
        cover: this.cover,
        age_limit: this.ageLimit,
      };
      axios
        .post("/api/events", params)
        .then(response => {
          console.log(response.data);
          this.$router.push(`/events/${this.event.id}`);
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
