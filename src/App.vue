<template>
  <div id="app">
    <!-- Navbar Start -->
    <nav
      class="navbar navbar-default navbar-header-full navbar-dark yamm navbar-static-top"
      role="navigation"
      id="header"
    >
      <div class="container">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
          <button
            type="button"
            class="navbar-toggle"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            <span class="sr-only">Toggle navigation</span>
            <i class="fa fa-bars"></i>
          </button>
          <a id="ar-brand" class="navbar-brand hidden-lg hidden-md hidden-sm navbar-dark" href="index.html">
            Artificial
            <span>Reason</span>
          </a>
        </div>
        <!-- navbar-header -->

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="pull-right"></div>
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav">
            <li class="dropdown">
              <router-link to="/venues" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown">
                Venue Index
              </router-link>
            </li>
            <li class="dropdown">
              <router-link to="/events" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown">
                Events Index
              </router-link>
            </li>
            <li class="dropdown">
              <router-link
                v-if="!loggedIn()"
                to="/signup"
                class="dropdown-toggle"
                data-toggle="dropdown"
                data-hover="dropdown"
              >
                Signup
              </router-link>
            </li>
            <li class="dropdown">
              <router-link
                v-if="!loggedIn()"
                to="/login"
                class="dropdown-toggle"
                data-toggle="dropdown"
                data-hover="dropdown"
              >
                Login
              </router-link>
            </li>
            <li class="dropdown">
              <router-link
                v-if="loggedIn()"
                to="/logout"
                class="dropdown-toggle"
                data-toggle="dropdown"
                data-hover="dropdown"
              >
                Logout
              </router-link>
            </li>
          </ul>
        </div>
        <!-- navbar-collapse -->
      </div>
      <!-- container -->
    </nav>
    <!-- Navbar End -->
    <router-view />
    <!-- Footer Start -->
    <footer id="footer">
      <p>
        &copy; 2021
        <a href="https://github.com/seanmilomaher" target="_blank" rel="noopener noreferrer">Jean de la nouille</a>
        , inc. All rights reserved.
      </p>
    </footer>
    <!-- Footer End -->
  </div>
</template>

<script>
export default {
  methods: {
    loggedIn: function() {
      return localStorage.jwt ? true : false;
    },
  },
};
</script>
