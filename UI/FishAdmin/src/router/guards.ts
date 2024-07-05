
import router from "@/router/index";
import { useUserInfoStore } from "@/stores/userInfo"

const Whitelist = ['/login', '/error']

// 全局前置守卫：初始化时执行/每次路由切换前执行
router.beforeEach(async (to, from) => {
    const userInfoStore = useUserInfoStore()
    const indexRoute = router.getRoutes().find(o => o.path == "/")
    const routeList = userInfoStore.getRouterList()


    if (!userInfoStore.isLoggedin && to.path != "/login") {

        return { path: '/login' }
    }


    //路由未生成，需要生成路由
    if (!indexRoute) {
        router.addRoute({
            name: "index",
            path: "/",
            component: () => import("@/views/IndexView.vue"),
            children: routeList
        })
        router.addRoute({
            path: '/index',
            redirect: "/"
        })

        //生成后重定向到index
        return { path: to.path }
    }

    //不在白名单需要处理
    if (Whitelist.indexOf(to.path) < 0) {

        //无路由数据
        if (routeList.length < 1) {
            return { path: '/login' }
        }

    }

    if (to.path == "/login" && userInfoStore.isLoggedin) {
        return { path: '/index' }
    }


})

// 全局后置守卫：初始化时执行，每次路由切换后执行
// router.afterEach((to, from) => {
// if (to.meta.title) {
//     document.title = to.meta.title; // 修改网页的title
// } else {
//     document.title = 'xxx';
// }
// })


export default router