<template>
  <div class="bands-new">
    <form v-on:submit.prevent="createBand()">
      <h1>New Band</h1>
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
      fromCity: "",
      fromState: "",
      bio: "",
      errors: [],
      band: {},
    };
  },
  methods: {
    createBand: function() {
      var params = {
        name: this.name,
        image: this.image,
        from_city: this.fromCity,
        from_state: this.fromState,
        bio: this.bio,
      };
      axios
        .post("/api/bands", params)
        .then(response => {
          console.log(response.data);
          this.band = response.data;
          this.$router.push(`/bands/${this.band.id}`);
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
