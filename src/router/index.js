import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import Dashboard from "../views/Dashboard.vue";
import DiaryPage from "../views/DiaryPage.vue";

const routes = [
  { path: "/", component: Dashboard, meta: { requiresAuth: true } },
  { path: "/login", component: Login },
  { path: "/signup", component: Signup },
  {
    path: "/diary/:id",
    name: "DiaryPage",
    component: DiaryPage,
    meta: { requiresAuth: true },
  },
   {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// auth guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  if (to.meta.requiresAuth && !token) {
    next("/login");
  } else if ((to.path === "/login" || to.path === "/signup") && token) {
    next("/");
  } else {
    next();
  }
});

export default router;
