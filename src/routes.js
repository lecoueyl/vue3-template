import NotFound from '@/pages/not-found.vue';
import Map from '@/pages/map.vue';

export const routes = [
  { path: '/', component: Map },
  { path: '/:path(.*)', component: NotFound },
];

export default routes;
