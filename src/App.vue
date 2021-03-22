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
    <aside id="footer-widgets">
      <div class="container">
        <div class="row">
          <div class="col-md-4">
            <h3 class="footer-widget-title">Sitemap</h3>
            <ul class="list-unstyled three_cols">
              <li><a href="index.html">Home</a></li>
              <li><a href="blog.html">Blog</a></li>
              <li><a href="portfolio_sidebar.html">Portafolio</a></li>
              <li><a href="portfolio_topvar.html">Works</a></li>
              <li><a href="page_timeline_left.html">Timeline</a></li>
              <li><a href="page_pricing.html">Pricing</a></li>
              <li><a href="page_about2.html">About Us</a></li>
              <li><a href="page_team.html">Our Team</a></li>
              <li><a href="page_services.html">Services</a></li>
              <li><a href="page_support.html">FAQ</a></li>
              <li><a href="page_login_full.html">Login</a></li>
              <li><a href="page_contact.html">Contact</a></li>
            </ul>
            <h3 class="footer-widget-title">Subscribe</h3>
            <p>
              Lorem ipsum Amet fugiat elit nisi anim mollit minim labore ut esse Duis ullamco ad dolor veniam velit.
            </p>
            <div class="input-group">
              <input type="text" class="form-control" placeholder="Email Adress" />
              <span class="input-group-btn">
                <button class="btn btn-ar btn-primary" type="button">Subscribe</button>
              </span>
            </div>
            <!-- /input-group -->
          </div>
          <div class="col-md-4">
            <div class="footer-widget">
              <h3 class="footer-widget-title">Recent Post</h3>
              <div class="media">
                <a class="pull-left" href="#">
                  <img class="media-object" src="assets/img/demo/m2.jpg" width="75" height="75" alt="image" />
                </a>
                <div class="media-body">
                  <h4 class="media-heading">
                    <a href="#">Lorem ipsum Duis quis occaecat minim lorem ipsum tempor officia labor</a>
                  </h4>
                  <small>August 18, 2013</small>
                </div>
              </div>
              <div class="media">
                <a class="pull-left" href="#">
                  <img class="media-object" src="assets/img/demo/m11.jpg" width="75" height="75" alt="image" />
                </a>
                <div class="media-body">
                  <h4 class="media-heading">
                    <a href="#">Lorem ipsum dolor excepteur sunt in lorem ipsum cillum tempor</a>
                  </h4>
                  <small>September 14, 2013</small>
                </div>
              </div>
              <div class="media">
                <a class="pull-left" href="#">
                  <img class="media-object" src="assets/img/demo/m4.jpg" width="75" height="75" alt="image" />
                </a>
                <div class="media-body">
                  <h4 class="media-heading"><a href="#">Lorem ipsum Dolor cupidatat minim adipisicing et fugiat</a></h4>
                  <small>October 9, 2013</small>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="footer-widget">
              <h3 class="footer-widget-title">Recent Works</h3>
              <div class="row">
                <div class="col-lg-6 col-md-6 col-sm-3 col-xs-6">
                  <a href="#" class="thumbnail">
                    <img src="assets/img/demo/wf1.jpg" class="img-responsive" alt="Image" />
                  </a>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-3 col-xs-6">
                  <a href="#" class="thumbnail">
                    <img src="assets/img/demo/wf2.jpg" class="img-responsive" alt="Image" />
                  </a>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-3 col-xs-6">
                  <a href="#" class="thumbnail">
                    <img src="assets/img/demo/wf3.jpg" class="img-responsive" alt="Image" />
                  </a>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-3 col-xs-6">
                  <a href="#" class="thumbnail">
                    <img src="assets/img/demo/wf4.jpg" class="img-responsive" alt="Image" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- row -->
      </div>
      <!-- container -->
    </aside>
    <!-- footer-widgets -->
    <footer id="footer">
      <p>
        &copy; 2014
        <a href="#">Artificial Reason</a>
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
