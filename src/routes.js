export const routes = [
  {
    path: '/login',
    component: () => import('@/pages/login.vue'),
  },
  {
    path: '/',
    redirect: '/manage',
  },
  {
    path: '/manage',
    component: () => import('@/pages/manage.vue'),
  },
  {
    path: '/fence',
    component: () => import('@/pages/fence.vue'),
  },
  {
    path: '/fence/:gfid',
    component: () => import('@/pages/fence.vue'),
    props: true,
  },
  {
    path: '/sign-in',
    component: () => import('@/pages/mobile/sign-in.vue'),
  },
  {
    path: '/:path(.*)',
    component: () => import('@/pages/not-found.vue'),
  },
];

export default routes;
