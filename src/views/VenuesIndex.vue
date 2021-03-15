<template>
  <div class="venues-index">
    <div id="map"></div>
  </div>
</template>

<style>
#map {
  height: 500px;
  width: 75%;
}
</style>

<script>
import axios from "axios";

/* global mapboxgl */

export default {
  data: function() {
    return {
      venues: [],
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

      this.venues.forEach((venue) => {
        console.log(venue);
        var popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`<a href="/venues/${venue.id}">${venue.name}</a>`);
        new mapboxgl.Marker()
          .setLngLat([venue.longitude, venue.latitude])
          .setPopup(popup)
          .addTo(map);
      });
    });
  },
  mounted: function() {
  },
};
</script>
