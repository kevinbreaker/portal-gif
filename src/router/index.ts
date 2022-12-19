import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/index.vue'),
    },
    {
      path: '/my-portal',
      name: 'MyPortal',
      meta: {
        auth: true,
      },
      component: () => import('@/views/MyPortal.vue'),
    },

    {
      path: '/:pathMatch(.*)',
      redirect: () => ({ name: 'Home' }),
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (to.meta.auth && !window.solana?.publicKey)
    next({ name: 'Home' })
  else if (to.name === 'Home' && window.solana?.publicKey?.length)
    next({ name: 'MyPortal' })
  else
    next()
})

export default router
