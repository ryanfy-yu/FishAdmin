import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '@/views/IndexView.vue'
import LoginView from '@/views/LoginView.vue'
import DataTable from '@/components/DataTable/DataTable.vue'
import HomeView from '@/views/HomeView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/index',
      component: IndexView,
      children: [
        {
          path: '/index/datalist',
          props: true,
          component: () => import('@/components/DataTable/DataTable.vue')
        },
        {
          path: '/index/datalist/usermanage',
          component: () => import('@/components/DataTable/DataTable.vue')
        },
        {
          path: '/index/datalist/menumanage',
          component: () => import('@/components/DataTable/DataTable.vue')
        },
        {
          path: '/index/home',
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
