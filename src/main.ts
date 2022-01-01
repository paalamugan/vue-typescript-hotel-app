import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

const app = createApp(App);

// Middlewares
app.use(store);
app.use(router);

app.mount('#app');
