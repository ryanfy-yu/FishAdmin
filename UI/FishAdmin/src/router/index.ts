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
          path: '/datalist/usermanage',
          component: () => import('@/views/DataTable/SystemUser/DataTable.vue')
        },
        {
          path: '/datalist/systemmenu',
          component: () => import('@/views/DataTable/SystemMenu/DataTable.vue')
        },
        {
          path: '/datalist/systemrole',
          component: () => import('@/views/DataTable/SystemRole/DataTable.vue')
        },
        {
          path: '/datalist/dictionaries',
          component: () => import('@/views/DataTable/Dictionaries/DataTable.vue')
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
