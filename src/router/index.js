import { createRouter, createWebHashHistory } from 'vue-router';
import { useStore } from '@/store';
import PageView from '@/layout/PageView.vue';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_BASE_PUBLIC_PATH),
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
      component: PageView,
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
  if (['/login', '/sign-in'].includes(to.path)) {
    return next();
  }
  const store = useStore();
  if (store.hasLoggedIn) {
    return next();
  }
  return next('/login');
});

export default router;
