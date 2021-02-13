import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/styles/index.css';

createApp(App)
    .use(store)
    .use(router)
    .mount('#app');

// Checks alt CEF then handles it
if ('alt' in window) {
    alt.on('route:set', (newRoute) => {
        router.push(newRoute).catch((err) => {
            throw err.name;
        });
    });
}
