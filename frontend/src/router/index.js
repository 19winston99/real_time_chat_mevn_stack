import { createRouter, createWebHistory } from 'vue-router';
import Register from '../views/Register.vue';
import Login from '../views/Login.vue';
import Home from '../views/Home.vue';
import Cookies from 'js-cookie';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: { requiresGuest: true } // Aggiungi questa opzione per indicare una rotta per gli ospiti (non autenticati)
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: { requiresGuest: true } // Aggiungi questa opzione per indicare una rotta per gli ospiti (non autenticati)
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { requiresAuth: true }
    }
  ]
});

// Aggiungi una navigation guard per controllare l'autenticazione
router.beforeEach((to, from, next) => {
  // Verifica se la rotta richiede un ospite non autenticato
  if (to.matched.some(record => record.meta.requiresGuest)) {
    // Controlla se l'utente è già autenticato
    const auth = sessionStorage.getItem('user');

    if (auth) {
      // Se l'utente è già autenticato, reindirizzalo alla pagina principale o altrove
      next({
        name: 'home'
      });
    } else {
      // Se l'utente non è autenticato, consenti l'accesso alla rotta per ospiti
      next();
    }
  }
  // Verifica se la rotta richiede autenticazione
  else if (to.matched.some(record => record.meta.requiresAuth)) {
    // Controlla se l'utente è loggato (verifica la presenza del token JWT nelle cookies)
    const auth = sessionStorage.getItem('user');

    if (!auth) {
      // Se l'utente non è autenticato, reindirizza alla pagina di login
      next({
        name: 'login'
      });
    } else {
      // Se l'utente è autenticato, consenti l'accesso alla rotta protetta
      next();
    }
  } else {
    // Se la rotta non richiede autenticazione, consenti l'accesso
    next();
  }
});

export default router;
