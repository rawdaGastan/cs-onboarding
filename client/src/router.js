import { createWebHistory, createRouter } from "vue-router";
import Calculator from "@/components/Calculator.vue";
import Auth from "@/components/Auth.vue";

const routes = [
  {
    path: "/calc",
    name: "Calculator",
    component: Calculator,
  },
  {
    path: "/",
    name: "Login",
    component: Auth,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;