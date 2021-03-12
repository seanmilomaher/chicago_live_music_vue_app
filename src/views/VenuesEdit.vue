<template>
  <div class="venues-edit">
    <form v-on:submit.prevent="updateVenue()">
      <h1>Edit Venue</h1>
      <div class="form-group">
        <label>Name:</label>
        <input type="text" class="form-control" v-model="venue.name" />
      </div>
      <div class="form-group">
        <label>Email:</label>
        <input type="text" class="form-control" v-model="venue.email" />
      </div>
      <div class="form-group">
        <label>Address:</label>
        <input type="text" class="form-control" v-model="venue.address" />
      </div>
      <div class="form-group">
        <label>Image:</label>
        <input type="text" class="form-control" v-model="venue.image" />
      </div>
      <input type="submit" class="btn btn-primary" value="Update" />
      <button v-on:click="destroyVenue()">Delete</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      venue: {},
      errors: [],
    };
  },
  created: function() {
    axios.get(`/api/venues/${this.$route.params.id}`).then(response => {
      console.log(response.data);
      this.venue = response.data;
    });
  },
  methods: {
    updateVenue: function() {
      var params = {
        name: this.venue.name,
        email: this.venue.email,
        address: this.venue.address,
        image: this.venue.image,
      };
      axios
        .patch(`/api/venues/${this.venue.id}`, params)
        .then(response => {
          console.log(response.data);
          this.$router.push(`/venues/${this.venue.id}`);
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    },
    destroyVenue: function() {
      if (confirm("Are you sure you want to delete this venue?")) {
        axios.delete(`api/venues/${this.venue.id}`).then(response => {
          console.log(response.data);
          this.$router.push("/venues");
        });
      }
    },
  },
};
</script>
