// Composables
import { createRouter, createWebHistory } from 'vue-router'

// function guard(to, from, next) {
//   let hasToken = sessionStorage.getItem('token')
//   if (hasToken) {
//       next();
//   } else {
//       next({ name: 'Login' });
//   }
// }
// function guest(to, from, next) {
//   let hasToken = sessionStorage.getItem('token')
//   if (!hasToken) {
//       next();
//   } else {
//       next('/');
//   }
// }
import Home from '../pages/index.vue'
import SignUp from '../pages/SignUp.vue'
import basePage from '../layouts/default.vue'
const routes = [
  {
    path: '/',
    component: basePage,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home,
      },
      {
        path: '/sign-up',
        name: 'SignUp',
        component: SignUp,
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
