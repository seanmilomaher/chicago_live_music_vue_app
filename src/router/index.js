import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";
import VenuesIndex from "../views/VenuesIndex.vue";
import VenuesShow from "../views/VenuesShow.vue";
import VenuesEdit from "../views/VenuesEdit.vue";
import BandsShow from "../views/BandsShow.vue";
import BandsEdit from "../views/BandsEdit.vue";
import EventsNew from "../views/EventsNew.vue";
import EventsIndex from "../views/EventsIndex.vue";
import EventsShow from "../views/EventsShow.vue";
import EventsEdit from "../views/EventsEdit.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: '/venues'
  },
  {
    path: "/signup",
    name: "signup",
    component: Signup,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/logout",
    name: "logout",
    component: Logout,
  },
  {
    path: "/venues",
    name: "venues-index",
    component: VenuesIndex,
  },
  {
    path: "/venues/:id",
    name: "venues-show",
    component: VenuesShow,
  },
  {
    path: "/venues/:id/edit",
    name: "venues-edit",
    component: VenuesEdit,
  },
  {
    path: "/bands/:id",
    name: "bands-show",
    component: BandsShow,
  },
  {
    path: "/bands/:id/edit",
    name: "bands-edit",
    component: BandsEdit,
  },
  {
    path: "/events/new",
    name: "events-new",
    component: EventsNew,
  },
  {
    path: "/events",
    name: "events-index",
    component: EventsIndex,
  },
  {
    path: "/events/:id",
    name: "events-show",
    component: EventsShow,
  },
  {
    path: "/events/:id/edit",
    name: "events-edit",
    component: EventsEdit,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
