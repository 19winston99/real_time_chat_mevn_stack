import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'
import "vue3-toastify/dist/index.css";
import 'animate.css';
import mitt from 'mitt';

const app = createApp(App)
// const eventBus = mitt();
// app.provide('eventBus', eventBus);
app.use(router);

app.mount('#app')