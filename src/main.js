import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import '@/assets/styles/fonts.css';
import '@/assets/styles/main.css';
import App from '@/app.vue';
import { routes } from '@/routes.js';

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_PUBLIC_PATH),
  routes,
});

const app = createApp(App);
app.use(router);
app.use(Antd);
app.mount('#app');
