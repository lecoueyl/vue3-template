import { createApp } from 'vue';
import { createPinia } from 'pinia';
import '@/assets/styles/main.less';
import App from '@/app.vue';
import router from './router';

// https://github.com/antfu/unplugin-vue-components/issues/162
import 'ant-design-vue/es/message/style/index.css';

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount('#app');
