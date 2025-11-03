import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
import Dashboard from "../views/Dashboard.vue";
import Tickets from "../views/Tickets.vue";
import AddTicket from "../views/AddTicket.vue";
import UpdateTicket from "../views/UpdateTicket.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/register",
      name: "register",
      component: Register,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
      meta: { requiresAuth: true },
    },
    {
      path: "/tickets",
      name: "tickets",
      component: Tickets,
      meta: { requiresAuth: true },
    },
    {
      path: "/tickets/add",
      name: "addTicket",
      component: AddTicket,
      meta: { requiresAuth: true },
    },
    {
      path: "/tickets/update/:id",
      name: "updateTicket",
      component: UpdateTicket,
      meta: { requiresAuth: true },
    },
    {
      path: "/:catchAll(.*)",
      name: "not-found",
      component: Home,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = JSON.parse(localStorage.getItem("ticketapp_session"));

  if (to.meta.requiresAuth && !isAuthenticated?.token) {
    next("/login");
  } else {
    next();
  }
});

export default router;
