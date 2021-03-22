<template>
  <div class="login">
    <div class="paper-back-full">
      <div class="login-form-full">
        <div class="fix-box">
          <div class="transparent-div no-padding animated fadeInUp animation-delay-8">
            <ul class="nav nav-tabs nav-tabs-transparent">
              <li class="active"><a href="#home" data-toggle="tab">Login</a></li>
            </ul>

            <!-- Tab panes -->
            <div class="tab-content">
              <div class="tab-pane active" id="home">
                <form role="form" v-on:submit.prevent="submit()">
                  <div class="form-group">
                    <div class="input-group login-input">
                      <span class="input-group-addon"><i class="fa fa-user"></i></span>
                      <input type="text" class="form-control" v-model="email" />
                    </div>
                    <br />
                    <div class="input-group login-input">
                      <span class="input-group-addon"><i class="fa fa-lock"></i></span>
                      <input type="password" class="form-control" v-model="password" />
                    </div>
                    <button type="submit" class="btn btn-ar btn-primary pull-right">Login</button>
                    <div class="clearfix"></div>
                  </div>
                </form>
              </div>
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
      email: "",
      password: "",
      errors: [],
    };
  },
  methods: {
    submit: function() {
      var params = {
        email: this.email,
        password: this.password,
      };
      axios
        .post("/api/sessions", params)
        .then(response => {
          axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          localStorage.setItem("venue_id", response.data.venue_id);
          this.$router.push(`/venues/${localStorage.venue_id}`);
        })
        .catch(error => {
          console.log(error.response);
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        });
    },
  },
};
</script>
