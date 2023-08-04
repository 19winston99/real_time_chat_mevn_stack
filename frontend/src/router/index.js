import { createRouter, createWebHistory } from 'vue-router';
import Register from '../views/Register.vue';
import Login from '../views/Login.vue';
import Home from '../views/Home.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: { requiresGuest: true }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { requiresGuest: true }
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { requiresAuth: true }
    }
  ]
});

//Add navigation guard to check authentication
router.beforeEach((to, from, next) => {

  if (to.matched.some(record => record.meta.requiresGuest)) {
    //Check if exist user sessionStorage
    const auth = sessionStorage.getItem('user');

    if (auth) {
      next({
        name: 'home'
      });
    } else {
      next();
    }
  }
  else if (to.matched.some(record => record.meta.requiresAuth)) {
    const auth = sessionStorage.getItem('user');

    if (!auth) {
      next({
        name: 'login'
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
