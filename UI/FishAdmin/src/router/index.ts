import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: ()=>import("@/views/LoginView.vue")
    },
    {
      path: '/index',
      component: ()=>import("@/views/IndexView.vue"),
      children: [
        {
          path: '/datalist',
          props: true,
          component: () => import('@/views/DataTable/DataTable.vue')
        },
        {
          path: '/datalist/usermanage',
          component: () => import('@/views/DataTable/SystemUser/DataTable.vue')
        },
        {
          path: '/datalist/menumanage',
          component: () => import('@/views/DataTable/DataTable.vue')
        },
        {
          path: '/home',
          component: () => import('@/views/HomeView.vue')
        },
        {
          path: '/:catchAll(.*)',
          component: () => import('@/views/Error.vue')
        }
      ]
    },
    { path: '/error', component: () => import('@/views/Error.vue') },
    { path: '/:catchAll(.*)', redirect: '/error' }
  ]
})

export default router
