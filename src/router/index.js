import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import EmployeeShow from "../views/EmployeeShow.vue";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";
import EmployeeNew from "../views/EmployeeNew.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/employees/new",
    name: "EmployeeNew",
    component: EmployeeNew,
  },
  {
    path: "/employees/:id",
    name: "EmployeeShow",
    component: EmployeeShow,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/logout",
    name: "Logout",
    component: Logout,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
