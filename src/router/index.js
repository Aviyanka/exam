// Composables
import { createRouter, createWebHistory } from 'vue-router'

function guard(to, from, next) {
  let hasToken = localStorage.getItem('token')
  if (hasToken) {
      next();
  } else {
      next({ name: 'Login' });
  }
}
function guest(to, from, next) {
  let hasToken = localStorage.getItem('token')
  if (!hasToken) {
      next();
  } else {
      next('/home');
  }
}
import Home from '../pages/index.vue'
import SignUp from '../pages/SignUp.vue'
import Login from '../pages/login.vue'
import basePage from '../layouts/default.vue'
import Dashboard from '../pages/home.vue'
const routes = [
  {
    path: '/',
    component: basePage,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home,
        beforeEnter: guest,
      },
      {
        path: '/sign-up/:type',
        name: 'SignUp',
        component: SignUp,
        beforeEnter: guest,
      },
      {
        path: '/login',
        name: 'Login',
        component: Login,
        beforeEnter: guest,
      },
      {
        path: '/home',
        name: 'Dashboard',
        component: Dashboard,
        beforeEnter: guard,
      },
      {
        path: "/:pathMatch(.*)*",
        name: "not-found",
        redirect: '/',
        // component: Home
      },
    ],
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})
export default router
