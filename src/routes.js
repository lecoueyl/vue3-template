import Index from '@/pages/index.vue';
import NotFound from '@/pages/not-found.vue';

export const routes = [
  { path: '/', component: Index },
  { path: '/:path(.*)', component: NotFound },
];

export default routes;
