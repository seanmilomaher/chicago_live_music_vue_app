<template>
  <div class="venues-show">
    <div class="container">
      <div class="row">
        <div class="col-md-12 venue-info">
          <section>
            <h3>{{ venue.name }}</h3>
            <img :src="venue.image" alt="avatar" class="img-responsive imageborder" />
          </section>
          <section>
            <h5>{{ venue.address }}</h5>
            <div v-if="isCurrentVenue()">
              <button
                type="button"
                class="btn btn-ar btn-warning btn-lrg"
                data-toggle="modal"
                data-target="#venueDetailsModal"
              >
                Edit Venue
              </button>
              <br />
              <button type="button" class="btn btn-ar btn-danger btn-lrg" v-on:click.prevent="destroyVenue()">
                Delete Venue
              </button>
              <br />
              <button type="button" class="btn btn-ar btn-success btn-lrg" v-on:click="$router.push(`/events/new`)">
                New Event
              </button>
              <hr />
              <h6>Can't find the band you're looking for?</h6>
              <button
                type="button"
                class="btn btn-ar btn-success btn-lrg"
                data-toggle="modal"
                data-target="#newBandModal"
              >
                Create New Band
              </button>
            </div>
          </section>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <section>
            <h2 class="section-title">Upcoming Events</h2>
            <div v-for="event in venue.events" :key="event.id" class="list-group">
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
                        <td>{{ formattedDate(event.date) }}</td>
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
      id="venueDetailsModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body">
            <div class="panel panel-primary-dark">
              <div class="panel-heading">Edit Venue</div>
              <div class="panel-body">
                <form role="form">
                  <div class="form-group">
                    <label>
                      Name
                    </label>
                    <input type="text" class="form-control" v-model="venue.name" />
                  </div>
                  <div class="form-group">
                    <label>
                      Address
                    </label>
                    <input type="text" class="form-control" v-model="venue.address" />
                  </div>
                  <div class="form-group">
                    <label>
                      Email
                    </label>
                    <input type="email" class="form-control" v-model="venue.email" />
                  </div>
                  <div class="form-group">
                    <label>
                      Image URL
                    </label>
                    <input type="text" class="form-control" v-model="venue.image" />
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-ar btn-danger" data-dismiss="modal" aria-hidden="true">Close</button>
            <button v-on:click="updateVenue()" class="btn btn-ar btn-primary" data-dismiss="modal" aria-hidden="true">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="newBandModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body">
            <div class="panel panel-primary-dark">
              <div class="panel-heading">Create New Band</div>
              <div class="panel-body">
                <form role="form">
                  <div class="form-group">
                    <label>
                      Name
                    </label>
                    <input type="text" class="form-control" v-model="bandName" />
                  </div>
                  <div class="form-group">
                    <label>
                      Image URL
                    </label>
                    <input type="text" class="form-control" v-model="bandImage" />
                  </div>
                  <div class="form-group">
                    <label>
                      From City
                    </label>
                    <input type="text" class="form-control" v-model="fromCity" />
                  </div>
                  <div class="form-group">
                    <label>
                      From State
                    </label>
                    <input type="text" class="form-control" v-model="fromState" />
                  </div>
                  <div class="form-group">
                    <label>
                      Bio
                    </label>
                    <input type="text" class="form-control" v-model="bio" />
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-ar btn-danger" data-dismiss="modal" aria-hidden="true">Close</button>
            <button v-on:click="createBand()" class="btn btn-ar btn-primary" data-dismiss="modal" aria-hidden="true">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.venue-info img {
  margin: auto;
  display: block;
}
.venue-info h3 {
  text-align: center;
}
.venue-info h5 {
  text-align: center;
}
</style>

<script>
import axios from "axios";
import moment from "moment";

export default {
  data: function() {
    return {
      venue: {},
      band: {},
      bandErrors: [],
      bandName: "",
      bandImage: "",
      fromCity: "",
      fromState: "",
      bio: "",
    };
  },
  created: function() {
    axios.get(`/api/venues/${this.$route.params.id}`).then(response => {
      console.log(response.data);
      this.venue = response.data;
    });
  },
  methods: {
    formattedTime: function(time) {
      return moment(time, "LT").format("LT");
    },
    formattedDate: function(date) {
      return moment(date).format("LL");
    },
    isCurrentVenue: function() {
      if (localStorage.venue_id == this.venue.id) {
        return true;
      }
    },
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
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    },
    destroyVenue: function() {
      if (confirm("Are you sure you want to delete this venue?")) {
        axios.delete(`api/venues/${this.venue.id}`).then(response => {
          console.log(response.data);
          delete axios.defaults.headers.common["Authorization"];
          localStorage.removeItem("jwt");
          localStorage.removeItem("venue_id");
          this.$router.push("/");
        });
      }
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
