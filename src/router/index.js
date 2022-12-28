import { createRouter, createWebHistory } from "vue-router";
import App from "@/App.vue";


const routes = [
  { path: '/:id', component: App, name: "command" },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
