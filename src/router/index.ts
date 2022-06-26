import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";

const historyMode = import.meta.env.DEV
  ? createWebHistory
  : createWebHashHistory;

const router = createRouter({
  history: historyMode(import.meta.env.BASE_URL),
  routes: [],
});

export default router;
