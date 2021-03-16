<template>
  <div class="bands-edit">
    <form v-on:submit.prevent="updateBand()">
      <h1>Edit Band</h1>
      <ul>
        <li class="text-danger" v-for="error in errors" v-bind:key="error">
          {{ error }}
        </li>
      </ul>
      <div class="form-group">
        <label>Name:</label>
        <input type="text" class="form-control" v-model="band.name" />
      </div>
      <div class="form-group">
        <label>Image:</label>
        <input type="text" class="form-control" v-model="band.image" />
      </div>
      <div class="form-group">
        <label>From City:</label>
        <input type="text" class="form-control" v-model="band.fromCity" />
      </div>
      <div class="form-group">
        <label>From State:</label>
        <input type="text" class="form-control" v-model="band.fromState" />
      </div>
      <div class="form-group">
        <label>Bio:</label>
        <input type="text" class="form-control" v-model="band.bio" />
      </div>
      <input type="submit" class="btn btn-primary" value="Update" />
      <button v-on:click="destroyBand()">Delete</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      band: {},
      errors: [],
    };
  },
  created: function() {
    axios.get(`/api/bands/${this.$route.params.id}`).then(response => {
      console.log(response.data);
      this.band = response.data;
    });
  },
  methods: {
    updateBand: function() {
      var params = {
        name: this.band.name,
        image: this.band.image,
        from_city: this.band.fromCity,
        from_state: this.band.fromState,
        bio: this.band.bio,
      };
      axios
        .patch(`/api/bands/${this.band.id}`, params)
        .then(response => {
          console.log(response.data);
          this.$router.push(`/bands/${this.band.id}`);
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    },
    destroyBand: function() {
      if (confirm("Are you sure you want to delete this band?")) {
        axios.delete(`api/bands/${this.band.id}`).then(response => {
          console.log(response.data);
          this.$router.push("/venues");
        });
      }
    },
  },
};
</script>
