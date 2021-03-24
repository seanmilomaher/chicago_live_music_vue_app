<template>
  <div class="bands-show">
    <div class="container">
      <div class="row">
        <div class="col-md-12 top">
          <section>
            <img :src="band.image" alt="avatar" class="img-responsive imageborder" />
            <h1>{{ band.name }}</h1>
          </section>
        </div>
      </div>
      <div v-if="loggedIn()">
        <div class="row">
          <div class="col-md-6">
            <button
              type="button"
              class="btn btn-ar btn-success btn-lrg"
              data-toggle="modal"
              data-target="#editBandModal"
            >
              Edit Band
            </button>
            <br />
            <button type="button" class="btn btn-ar btn-danger btn-lrg" v-on:click.prevent="destroyBand()">
              Delete Band
            </button>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <h2 class="section-title">Band Information</h2>
          <div class="panel panel-default">
            <div class="panel-body">
              <table class="table table-striped">
                <tr>
                  <th>From</th>
                  <td>{{ band.from_city }}, {{ band.from_state }}</td>
                </tr>
                <tr>
                  <th>Bio</th>
                  <td>{{ band.bio }}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <section>
            <h2 class="section-title">Upcoming Events</h2>
            <div v-for="event in band.events" :key="event.id" class="list-group">
              <div class="list-group-item">
                <div class="row">
                  <div class="col-md-6">
                    <router-link :to="`/events/${event.id}`">
                      <img :src="event.image" alt="band-image" class="img-post img-responsive" />
                    </router-link>
                  </div>
                  <div class="col-md-6">
                    <router-link :to="`/events/${event.id}`">
                      <h3>{{ event.name }}</h3>
                    </router-link>
                    <table class="table table-striped">
                      <tr>
                        <th>Date</th>
                        <td>{{ fomattedDate(event.date) }}</td>
                      </tr>
                      <tr>
                        <th>Start</th>
                        <td>{{ formattedTime(event.start_time) }}</td>
                      </tr>
                      <tr>
                        <th>End</th>
                        <td>{{ formattedTime(event.end_time) }}</td>
                      </tr>
                      <tr>
                        <th>Cover</th>
                        <td>{{ event.cover }}</td>
                      </tr>
                      <tr>
                        <th>Age Limit</th>
                        <td>{{ event.age_limit }}</td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <!--list-group -->
          </section>
        </div>
      </div>
    </div>
    <!-- container  -->
    <div
      class="modal fade"
      id="editBandModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body">
            <div class="panel panel-primary-dark">
              <div class="panel-heading">Edit Band</div>
              <div class="panel-body">
                <form role="form">
                  <div class="form-group">
                    <label>
                      Name
                    </label>
                    <input type="text" class="form-control" v-model="band.name" />
                  </div>
                  <div class="form-group">
                    <label>
                      Image URL
                    </label>
                    <input type="text" class="form-control" v-model="band.image" />
                  </div>
                  <div class="form-group">
                    <label>
                      From City
                    </label>
                    <input type="text" class="form-control" v-model="band.from_city" />
                  </div>
                  <div class="form-group">
                    <label>
                      From State
                    </label>
                    <input type="text" class="form-control" v-model="band.from_state" />
                  </div>
                  <div class="form-group">
                    <label>
                      Bio
                    </label>
                    <input type="text" class="form-control" v-model="band.bio" />
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-ar btn-danger" data-dismiss="modal" aria-hidden="true">Close</button>
            <button v-on:click="updateBand()" class="btn btn-ar btn-primary" data-dismiss="modal" aria-hidden="true">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.top img {
  margin: auto;
  display: block;
}
.top h1 {
  text-align: center;
}
</style>

<script>
import axios from "axios";
import moment from "moment";

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
    formattedTime: function(time) {
      return moment(time, "LT").format("LT");
    },
    fomattedDate: function(date) {
      return moment(date).format("LL");
    },
    loggedIn: function() {
      return localStorage.jwt ? true : false;
    },
    updateBand: function() {
      var params = {
        name: this.band.name,
        image: this.band.image,
        from_city: this.band.from_city,
        from_state: this.band.from_state,
        bio: this.band.bio,
      };
      axios
        .patch(`/api/bands/${this.band.id}`, params)
        .then(response => {
          console.log(response.data);
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
