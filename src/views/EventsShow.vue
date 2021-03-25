<template>
  <div class="events-show">
    <div class="container">
      <div class="row">
        <div class="col-md-4">
          <section>
            <h3>{{ event.name }}</h3>
            <img :src="event.image" alt="avatar" class="img-responsive imageborder" />
          </section>
          <section>
            <div class="panel panel-primary">
              <div class="panel-heading">
                Event Details
              </div>
              <table class="table table-striped">
                <tr>
                  <th>Venue</th>
                  <td>
                    <router-link :to="`/venues/${event.venue_id}`">
                      {{ event.venue.name }}
                    </router-link>
                  </td>
                </tr>
                <tr>
                  <th>Address</th>
                  <td>{{ event.venue.address }}</td>
                </tr>
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
          </section>
          <div v-if="isCurrentVenue()">
            <button
              type="button"
              class="btn btn-ar btn-warning btn-block"
              data-toggle="modal"
              data-target="#eventDetailsModal"
            >
              Edit Event Details
            </button>
            <br />
            <button
              type="button"
              class="btn btn-ar btn-warning btn-block"
              data-toggle="modal"
              data-target="#eventBandsModal"
            >
              Edit Bands
            </button>
            <br />
            <button type="button" class="btn btn-ar btn-danger btn-block" v-on:click.prevent="destroyEvent()">
              Delete Event
            </button>
            <hr />
            <h6>Can't find the band you're looking for?</h6>
            <button
              type="button"
              class="btn btn-ar btn-success btn-block"
              data-toggle="modal"
              data-target="#newBandModal"
            >
              Create New Band
            </button>
          </div>
        </div>
        <div class="col-md-8">
          <section>
            <h2 class="section-title">Bands</h2>
            <div v-for="band in event.bands" :key="band.id" class="list-group">
              <div class="list-group-item">
                <div class="row">
                  <div class="col-md-6">
                    <router-link :to="`/bands/${band.id}`">
                      <img :src="band.image" alt="band-image" class="img-post img-responsive" />
                    </router-link>
                  </div>
                  <div class="col-md-6">
                    <router-link :to="`/bands/${band.id}`">
                      <h3>{{ band.name }}</h3>
                    </router-link>
                    <table class="table table-striped">
                      <tr>
                        <th>From</th>
                        <td>{{ band.from_city }}, {{ band.from_state }}</td>
                      </tr>
                      <tr>
                        <th>Order</th>
                        <td>{{ band.order }}</td>
                      </tr>
                      <tr>
                        <th>Start Time</th>
                        <td>{{ formattedTime(band.start_time) }}</td>
                      </tr>
                      <tr>
                        <th>End Time</th>
                        <td>{{ formattedTime(band.end_time) }}</td>
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
      id="eventDetailsModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body">
            <div class="panel panel-primary-dark">
              <div class="panel-heading">Edit Event</div>
              <div class="panel-body">
                <form role="form">
                  <div class="form-group">
                    <label>
                      Event Name
                    </label>
                    <input type="text" class="form-control" v-model="event.name" />
                  </div>
                  <div class="form-group">
                    <label>
                      Image URL
                    </label>
                    <input type="text" class="form-control" v-model="event.image" />
                  </div>
                  <div class="form-group">
                    <label>
                      Date
                    </label>
                    <input type="date" class="form-control" v-model="event.date" />
                  </div>
                  <div class="form-group">
                    <label>
                      Start Time
                    </label>
                    <input type="time" class="form-control" v-model="event.start_time" />
                  </div>
                  <div class="form-group">
                    <label>
                      End Time
                    </label>
                    <input type="time" class="form-control" v-model="event.end_time" />
                  </div>
                  <div class="form-group">
                    <label>
                      Cover
                    </label>
                    <input type="text" class="form-control" v-model="event.cover" />
                  </div>
                  <div class="form-group">
                    <label>
                      Age Limit
                    </label>
                    <input type="text" class="form-control" v-model="event.age_limit" />
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-ar btn-danger" data-dismiss="modal" aria-hidden="true">Close</button>
            <button v-on:click="updateEvent()" class="btn btn-ar btn-primary" data-dismiss="modal" aria-hidden="true">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="eventBandsModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body">
            <div class="panel panel-primary-dark">
              <div class="panel-heading">Edit Band Info</div>
              <div v-for="eventBand in eventBands" :key="eventBand.band_id" class="panel-body">
                <form role="form">
                  <div class="form-group">
                    <label>
                      Band
                    </label>
                    <select v-model="eventBand.band_id">
                      <option v-for="band in bands" :key="band.id" v-bind:value="band.id">{{ band.name }}</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label>
                      Start Time
                    </label>
                    <input type="time" class="form-control" v-model="eventBand.start_time" />
                  </div>
                  <div class="form-group">
                    <label>
                      End Time
                    </label>
                    <input type="time" class="form-control" v-model="eventBand.end_time" />
                  </div>
                  <div class="form-group">
                    <label>
                      Order
                    </label>
                    <input type="text" class="form-control" v-model="eventBand.order" />
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-ar btn-danger" data-dismiss="modal" aria-hidden="true">Close</button>
            <button
              v-on:click="
                createEventBand();
                updateEvent();
              "
              class="btn btn-ar btn-primary"
              data-dismiss="modal"
              aria-hidden="true"
            >
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

<script>
import axios from "axios";
import moment from "moment";

export default {
  data: function() {
    return {
      event: {
        venue: {},
      },
      eventBands: [],
      bands: [],
      errors: [],
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
    formattedTime: function(time) {
      return moment(time, "LT").format("LT");
    },
    formattedDate: function(date) {
      return moment(date).format("LL");
    },
    isCurrentVenue: function() {
      if (localStorage.venue_id == this.event.venue_id) {
        return true;
      }
    },
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
