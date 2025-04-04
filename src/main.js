import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css';
import 'vue-toastification/dist/index.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createBootstrap } from 'bootstrap-vue-next';
import Toast, { POSITION } from 'vue-toastification';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createBootstrap());
app.use(createPinia());
app.use(Toast, {
  position: POSITION.BOTTOM_RIGHT,
  pauseOnHover: false,
});
app.use(router);

app.mount('#app');
