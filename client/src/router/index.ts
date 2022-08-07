import { createRouter, createWebHistory } from "vue-router";
import WikiPage from "../views/WikiPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: WikiPage,
    },
  ],
});

export default router;
