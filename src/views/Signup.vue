<template>
  <div class="signup">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <h2 class="section-title no-margin-top">Register Venue</h2>
          <div class="panel panel-success-dark animated fadeInDown">
            <div class="panel-heading">Register Form</div>
            <div class="panel-body">
              <form role="form" v-on:submit.prevent="submit()">
                <div class="form-group">
                  <label>
                    Venue Name
                    <sup>*</sup>
                  </label>
                  <input type="text" class="form-control" v-model="name" />
                </div>
                <div class="form-group">
                  <label>
                    Address
                    <sup>*</sup>
                  </label>
                  <input type="text" class="form-control" v-model="address" />
                </div>
                <div class="form-group">
                  <label>
                    Image URL
                    <sup>*</sup>
                  </label>
                  <input type="text" class="form-control" v-model="image" />
                </div>
                <div class="form-group">
                  <label>
                    Email
                    <sup>*</sup>
                  </label>
                  <input type="email" class="form-control" v-model="email" />
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>
                        Password
                        <sup>*</sup>
                      </label>
                      <input type="password" class="form-control" v-model="password" />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>
                        Confirm Password
                        <sup>*</sup>
                      </label>
                      <input type="password" class="form-control" v-model="passwordConfirmation" />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-4">
                    <button type="submit" class="btn btn-ar btn-primary pull-right">Register</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      address: "",
      image: "",
      errors: [],
    };
  },
  methods: {
    submit: function() {
      var params = {
        name: this.name,
        email: this.email,
        password: this.password,
        password_confirmation: this.passwordConfirmation,
        address: this.address,
        image: this.image,
      };
      axios
        .post("/api/venues", params)
        .then(response => {
          console.log(response.data);
          this.$router.push("/login");
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
