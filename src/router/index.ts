import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Dashboard from "@/views/Dashboard.vue";
import MyTickets from "@/views/MyTickets.vue";
import CreateTicket from "@/views/CreateTicket.vue";
import MyData from "@/views/MyData.vue";
import DashboardHome from "@/views/DashboardHome.vue";

const routes: Array<RouteRecordRaw> = [
  { path: "/", component: Home, meta: { guest: true } },
  { path: "/login", component: Login, meta: { guest: true } },
  { path: "/Register", component: Register, meta: { guest: true } },
  {
    path: "/dashboard",
    component: Dashboard,
    children: [
      { path: "my-tickets", component: MyTickets },
      { path: "create-ticket", component: CreateTicket },
      { path: "my-data", component: MyData },
      { path: "", component: DashboardHome },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const tokenExpiry = localStorage.getItem("tokenExpiry");
  if (tokenExpiry && new Date().getTime() > Number(tokenExpiry)) {
    localStorage.removeItem("authToken");
    localStorage.removeItem("tokenExpiry");
  }
  const isAuthenticated = !!localStorage.getItem("authToken");
  if (to.matched.some((record) => record.meta.guest)) {
    if (isAuthenticated) {
      next("/dashboard");
    } else {
      next();
    }
  } else {
    if (!isAuthenticated) {
      next("/login");
    } else {
      next();
    }
  }
});

export default router;
