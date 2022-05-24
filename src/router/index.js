import { createRouter, createWebHashHistory } from 'vue-router';
import { useStore } from '@/store';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/login',
      component: () => import('@/pages/login.vue'),
    },
    {
      path: '/sign-in',
      component: () => import('@/pages/mobile/sign-in.vue'),
    },
    {
      path: '/',
      component: () => import('@/layout/PageView.vue'),
      redirect: '/manage',
      children: [
        {
          path: '/manage',
          component: () => import('@/pages/manage.vue'),
        },
        {
          path: '/fence/add',
          component: () => import('@/pages/fence.vue'),
        },
        {
          path: '/fence/edit',
          component: () => import('@/pages/fence.vue'),
          props: true,
        },
      ],
    },
    {
      path: '/:path(.*)',
      component: () => import('@/pages/not-found.vue'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const store = useStore();
  if (
    ['/login', '/sign-in'].includes(to.path)
    || store.hasLoggedIn
  ) {
    return next();
  }
  return next('/login');
});

export default router;
