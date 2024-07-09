import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'


const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import("@/views/LoginView.vue")
    },
    {
      path: "/index",
      redirect: "/"
    },
    // {
    //   name: "error",
    //   path: '/:catchAll(.*)',
    //   component: () => import('@/views/Error.vue')
    // }
    {
      path: '/*',
      name: '404',
      component: () => import('@/views/Error.vue')
    },
    {
      path: '/500',
      name: '500',
      component: () => import('@/views/Error.vue')
    }
    // {
    //   path: '/index',
    //   component: () => import("@/views/IndexView.vue"),
    //   children: [
    // {
    //   path: '/datalist/usermanage',
    //   component: () => import('@/views/DataTable/SystemUser/DataTable.vue')
    // },
    // {
    //   path: '/datalist/systemmenu',
    //   component: () => import('@/views/DataTable/SystemMenu/DataTable.vue')
    // },
    // {
    //   path: '/datalist/systemrole',
    //   component: () => import('@/views/DataTable/SystemRole/DataTable.vue')
    // },
    // {
    //   path: '/datalist/dictionaries',
    //   component: () => import('@/views/DataTable/Dictionaries/DataTable.vue')
    // }
    // ]
    // },
  ]

})

export default router
