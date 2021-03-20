<template>
  <div class="events-edit">
    <form v-on:submit.prevent="updateEvent()">
      <h1>Edit Event</h1>
      <ul>
        <li class="text-danger" v-for="error in errors" v-bind:key="error">
          {{ error }}
        </li>
      </ul>
      <div class="form-group">
        <label>Name:</label>
        <input type="text" class="form-control" v-model="event.name" />
      </div>
      <div class="form-group">
        <label>Image:</label>
        <input type="text" class="form-control" v-model="event.image" />
      </div>
      <div class="form-group">
        <label>Date:</label>
        <input type="text" class="form-control" v-model="event.date" />
      </div>
      <div class="form-group">
        <label>Start Time:</label>
        <input type="text" class="form-control" v-model="event.start_time" />
      </div>
      <div class="form-group">
        <label>End Time:</label>
        <input type="text" class="form-control" v-model="event.end_time" />
      </div>
      <div class="form-group">
        <label>Cover:</label>
        <input type="text" class="form-control" v-model="event.cover" />
      </div>
      <div class="form-group">
        <label>Age Limit:</label>
        <input type="text" class="form-control" v-model="event.age_limit" />
      </div>
      <br />
      <h3>Edit Bands</h3>
      <div v-for="eventBand in eventBands" :key="eventBand.band_id">
        <form v-on:submit.prevent="createEventBand()">
          <div>
            Pick a Band:
            <select v-model="eventBand.band_id">
              <option v-for="band in bands" :key="band.id" v-bind:value="band.id">{{ band.name }}</option>
            </select>
          </div>
          <div class="form-group">
            <label>Start Time:</label>
            <input type="text" class="form-control" v-model="eventBand.start_time" />
          </div>
          <div class="form-group">
            <label>End Time:</label>
            <input type="text" class="form-control" v-model="eventBand.end_time" />
          </div>
          <div class="form-group">
            <label>Order:</label>
            <input type="text" class="form-control" v-model="eventBand.order" />
          </div>
          <input type="submit" class="btn btn-primary" value="Add Band to Event" />
        </form>
      </div>
      <input type="submit" class="btn btn-primary" value="Update" />
      <button v-on:click="destroyEvent()">Delete</button>
    </form>
    <p>{{ eventBands }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      event: {},
      bands: [],
      errors: [],
      eventBands: [],
    };
  },
  created: function() {
    axios.get(`/api/events/${this.$route.params.id}`).then(response => {
      console.log(response.data);
      this.event = response.data;
      this.event.bands.forEach(band => {
        var eventBand = {
          band_id: band.id,
          start_time: band.start_time,
          end_time: band.end_time,
          order: band.order,
        };
        this.eventBands.push(eventBand);
      });
    });
    axios.get(`/api/bands`).then(response => {
      console.log(response.data);
      this.bands = response.data;
    });
  },
  methods: {
    updateEvent: function() {
      var params = {
        name: this.event.name,
        image: this.event.image,
        date: this.event.date,
        start_time: this.event.start_time,
        end_time: this.event.end_time,
        cover: this.event.cover,
        age_limit: this.event.age_limit,
        event_bands: this.eventBands,
      };
      axios
        .patch(`/api/events/${this.event.id}`, params)
        .then(response => {
          console.log(response.data);
          this.$router.push(`/events/${this.event.id}`);
        })
        .catch(error => {
          this.error = error.response.data.errors;
        });
    },
    createEventBand: function() {
      this.eventBands.push({
        band_id: this.eventBandId,
        start_time: this.bandStartTime,
        end_time: this.bandEndTime,
        order: this.order,
      });
      (this.eventBandId = ""), (this.bandStartTime = ""), (this.bandEndTime = ""), (this.order = "");
    },
    destroyEvent: function() {
      if (confirm("Are you sure you want to delete this event?")) {
        axios.delete(`api/events/${this.event.id}`).then(response => {
          console.log(response.data);
          this.$router.push(`/venues/${this.event.venue_id}`);
        });
      }
    },
  },
};
</script>
