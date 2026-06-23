import { createRouter, createWebHistory } from 'vue-router'
import Auth from "../pages/Auth.vue"
import Main from "../pages/Main.vue"
import Register from "../pages/Register.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "main",
      component: Main
    },
    {
      path: "/auth",
      name: "auth",
      component: Auth
    },
    {
      path: "/register",
      name: "register",
      component: Register
    },
  ],
})

export default router
