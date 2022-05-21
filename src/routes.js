export const routes = [
  { path: '/', component: () => import('@/pages/map.vue') },
  // { path: '/fence', component: () => import('@/pages/fence.vue') },
  { path: '/fence/:gfid', component: () => import('@/pages/fence.vue'), props: true },
  { path: '/:path(.*)', component: () => import('@/pages/not-found.vue') },
];

export default routes;
