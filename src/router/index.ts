import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/competitions/:id",
      name: "competitions",
      component: () => import("../views/CompetitionsView.vue"),
    },
    {
      path: "/teams/:id",
      name: "teams",
      component: () => import("../views/TeamsView.vue"),
    },
    {
      path: "/team/:id",
      name: "team",
      component: () => import("../views/TeamView.vue"),
    },
    {
      path: "/player/:id",
      name: "player",
      component: () => import("../views/PlayerView.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      component: () => import("../views/NotFoundView.vue"),
    },
  ],
});

export default router;
