import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Dashboard from "@/views/Dashboard.vue";
import MyTickets from "@/views/MyTickets.vue";
import CreateTicket from "@/views/CreateTicket.vue";
import MyData from "@/views/MyData.vue";
import DashboardHome from "@/views/DashboardHome.vue";
import Admin from "@/views/Admin.vue";
import { useStore } from "vuex";

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
      { path: "admin", component: Admin, meta: { admin: true } },
      { path: "", component: DashboardHome },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const tokenExpiry = localStorage.getItem("tokenExpiry");
  const store = useStore();

  const auth = store.state.authenticated;
  let isAdmin = store.state.isAdmin;

  if (!isAdmin) {
    const token = localStorage.getItem("authToken");

    if (token) {
      try {
        const tokenObject = { token };

        const responseToken = await fetch(
          `${process.env.VUE_APP_HOST}/auth/verify-token`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(tokenObject),
          }
        );
        const responseBody = await responseToken.json();
        if (!responseToken.ok) {
          if (responseBody.shouldClearLocalStorage === true) {
            localStorage.removeItem("authToken");
            localStorage.removeItem("userId");
          }

          throw new Error(responseBody.message);
        }

        if (responseBody.isAdmin) {
          store.commit("SET_ADMIN", true);
          isAdmin = true;
        } else {
          store.commit("SET_ADMIN", false);
          isAdmin = false;
        }
      } catch (error) {
        if ((error as Error).message === "No auth token") {
          store.commit("SET_AUTH", false);
          await router.push("/login");
        }
        console.error("Error verifying token:", error);
      }
    }
  }
  if (new Date().getTime() > Number(tokenExpiry)) {
    localStorage.removeItem("authToken");
    localStorage.removeItem("tokenExpiry");
  }

  if (to.matched.some((record) => record.meta.admin)) {
    if (!isAdmin) {
      next("/dashboard");
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.guest)) {
    if (auth) {
      next("/dashboard");
    } else {
      next();
    }
  } else {
    if (!auth) {
      next("/login");
    } else {
      next();
    }
  }
});

export default router;
