<template>
  <div class="events-index">
    <div class="container">
      <div class="row">
        <div class="input-group">
          <input type="text" class="form-control" placeholder="Search..." v-model="filter" />
          <span class="input-group-btn">
            <button class="btn btn-default" type="button"><i class="fa fa-search"></i></button>
          </span>
        </div>
        <!-- /input-group -->
        <div class="col-xs-12">
          <div v-for="event in filterBy(events, filter)" :key="event.id">
            <article>
              <div class="panel panel-default">
                <div class="panel-body">
                  <h3 class="post-title">
                    <router-link :to="`/events/${event.id}`" class="transicion">{{ event.name }}</router-link>
                  </h3>
                  <div class="row">
                    <div class="col-md-6">
                      <router-link :to="`/events/${event.id}`">
                        <img :src="event.image" alt="" />
                      </router-link>
                    </div>
                    <div class="col-md-6">
                      <router-link :to="`/venues/${event.venue.id}`">
                        <p>Venue: {{ event.venue.name }}</p>
                      </router-link>
                      <p>Date: {{ formattedDate(event.date) }}</p>
                      <p>Start Time: {{ formattedTime(event.start_time) }}</p>
                      <p>End Time: {{ formattedTime(event.end_time) }}</p>
                      <p>Cover: {{ event.cover }}</p>
                      <p>Age Limit: {{ event.age_limit }}</p>
                    </div>
                  </div>
                </div>
                <div class="panel-footer"></div>
              </div>
            </article>
          </div>
          <!-- post -->
        </div>
        <!-- col-md-8 -->
      </div>
      <!-- row -->
    </div>
    <!-- container  -->
  </div>
</template>

<style scoped>
img {
  float: left;
  width: 400px;
  height: 400px;
  object-fit: cover;
}
</style>

<script>
import axios from "axios";
import moment from "moment";
import Vue2Filters from "vue2-filters";

export default {
  mixins: [Vue2Filters.mixin],
  data: function() {
    return {
      events: [],
      filter: "",
    };
  },
  created: function() {
    axios.get("/api/events").then(response => {
      console.log(response.data);
      this.events = response.data;
    });
  },
  methods: {
    formattedTime: function(time) {
      return moment(time, "LT").format("LT");
    },
    formattedDate: function(date) {
      return moment(date).format("LL");
    },
  },
};
</script>
