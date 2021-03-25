<template>
  <div class="venues-index">
    <h1 class="section-title">
      Venues
    </h1>
    <div class="container">
      <div class="panel panel-default">
        <div class="panel-body">
          <div id="map"></div>
        </div>
        <div class="panel-footer">
          <div>
            Select Venue:
            <select v-model="venueId" v-on:keyup.enter="routeToVenue()">
              <option v-for="venue in venues" :key="venue.id" v-bind:value="venue.id">{{ venue.name }}</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
#map {
  height: 500px;
  width: 100%;
}
h1 {
  text-align: center;
}
</style>

<script>
import axios from "axios";
import Vue2Filters from "vue2-filters";

/* global mapboxgl */

export default {
  mixins: [Vue2Filters.mixin],
  data: function() {
    return {
      venues: [],
      venue: {},
      venueId: "",
    };
  },
  created: function() {
    axios.get("/api/venues").then(response => {
      console.log(response.data);
      this.venues = response.data;
      mapboxgl.accessToken =
        "pk.eyJ1Ijoic21haGVyMTk5NCIsImEiOiJja2xnd3lnZzM1NnFuMm91aThzZTY5eGE5In0.1mYmGf9kYpwXFlZVcuAtVg";
      var map = new mapboxgl.Map({
        container: "map", // container ID
        style: "mapbox://styles/mapbox/streets-v11", // style URL
        center: [-87.705, 41.9], // starting position [lng, lat]
        zoom: 10.5, // starting zoom
      });

      this.venues.forEach(venue => {
        console.log(venue);
        var popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`<a href="/venues/${venue.id}">${venue.name}</a>`);
        new mapboxgl.Marker()
          .setLngLat([venue.longitude, venue.latitude])
          .setPopup(popup)
          .addTo(map);
      });
    });
  },
  methods: {
    routeToVenue: function() {
      this.$router.push(`/venues/${this.venueId}`);
    },
  },
};
</script>
