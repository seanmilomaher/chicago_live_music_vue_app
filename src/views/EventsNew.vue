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
        <input type="date" class="form-control" v-model="date" />
      </div>
      <div class="form-group">
        <label>Start Time:</label>
        <input type="time" class="form-control" v-model="startTime" />
      </div>
      <div class="form-group">
        <label>End Time:</label>
        <input type="time" class="form-control" v-model="endTime" />
      </div>
      <div class="form-group">
        <label>Cover:</label>
        <input type="text" class="form-control" v-model="cover" />
      </div>
      <div class="form-group">
        <label>Age Limit:</label>
        <input type="text" class="form-control" v-model="ageLimit" />
      </div>
      <br />
      <form v-on:submit.prevent="createEventBand()">
        <h3>Add a Band</h3>
        <div>
          Pick a Band:
          <select v-model="eventBandId">
            <option v-for="band in bands" :key="band.id" v-bind:value="band.id">{{ band.name }}</option>
          </select>
        </div>
        <div class="form-group">
          <label>Start Time:</label>
          <input type="time" class="form-control" v-model="bandStartTime" />
        </div>
        <div class="form-group">
          <label>End Time:</label>
          <input type="time" class="form-control" v-model="bandEndTime" />
        </div>
        <div class="form-group">
          <label>Order:</label>
          <input type="text" class="form-control" v-model="order" />
        </div>
        <input type="submit" class="btn btn-primary" value="Add Band to Event" />
        <p>{{ eventBands }}</p>
      </form>
      <div v-for="band in filterBy(bands, eventBandId)" :key="band.id"></div>
      <input type="submit" class="btn btn-primary" value="Create Event" />
    </form>
    <div class="bands-new">
      <form v-on:submit.prevent="createBand()">
        <h1>New Band</h1>
        <ul>
          <li class="text-danger" v-for="error in bandErrors" v-bind:key="error">
            {{ error }}
          </li>
        </ul>
        <div class="form-group">
          <label>Name:</label>
          <input type="text" class="form-control" v-model="bandName" />
        </div>
        <div class="form-group">
          <label>Image:</label>
          <input type="text" class="form-control" v-model="bandImage" />
        </div>
        <div class="form-group">
          <label>From City:</label>
          <input type="text" class="form-control" v-model="fromCity" />
        </div>
        <div class="form-group">
          <label>From State:</label>
          <input type="text" class="form-control" v-model="fromState" />
        </div>
        <div class="form-group">
          <label>Bio:</label>
          <input type="text" class="form-control" v-model="bio" />
        </div>
        <input type="submit" class="btn btn-primary" value="Create Band" />
      </form>
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
      bandName: "",
      bandImage: "",
      fromCity: "",
      fromState: "",
      bio: "",
      bandErrors: [],
      band: {},
      name: "",
      image: "",
      date: "",
      startTime: "",
      endTime: "",
      cover: "",
      ageLimit: "",
      eventBandId: "",
      bandStartTime: "",
      bandEndTime: "",
      order: "",
      errors: [],
      bands: [],
      eventBands: [],
      event: {},
    };
  },
  created: function() {
    axios.get("/api/bands").then(response => {
      console.log(response.data);
      this.bands = response.data;
    });
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
        event_bands: this.eventBands,
      };
      axios
        .post("/api/events", params)
        .then(response => {
          console.log(response.data);
          this.$router.push(`/events/${response.data.id}`);
        })
        .catch(error => {
          this.errors = error.response.data.errors;
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
    createBand: function() {
      var params = {
        name: this.bandName,
        image: this.bandImage,
        from_city: this.fromCity,
        from_state: this.fromState,
        bio: this.bio,
      };
      axios
        .post("/api/bands", params)
        .then(response => {
          console.log(response.data);
          this.$router.push(`/bands/${response.data.id}`);
        })
        .catch(error => {
          this.bandErrors = error.response.data.errors;
        });
    },
  },
};
</script>
