import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { appsettings } from '@/scripts/appSettings';
import httpRequest from '@/scripts/httpRequest'


// 你可以任意命名 `defineStore()` 的返回值，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。
// (比如 `useUserStore`，`useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID。
export const useUserInfoStore = defineStore('SystemUserInfo', () => {

    const accessToken = ref("")
    const refreshToken = ref("")
    const username = ref("")
    const menus = ref([])

    const GetUserInfoFormApi = async () => {
        await httpRequest.get(`${appsettings.default_baseURL}/LoggedUserInfo`, {})
            .then(function (response) {
                // 处理成功情况
                if (response.data.isSuccess) {

                    menus.value = response.data.data.menus
                }
            })
    }

    const getHomeMenu = () => {

        let menuList: Array<any> = []
        menus.value.forEach((o, index) => {
            menuList.push({
                index: index,
                title: o.menuName,
                icon: o.icon,
                path: o.url,
                parentId: o.parentId,
                id: o.id
            })
        })


        return GetRecursionMenuList("", menuList)
    }

    const modules = import.meta.glob('../views/**/**.vue')  // 导入
    const getRouterList = () => {

        let routeList = []
        if (menus && menus.value && menus.value.length > 0) {

            const menusList = menus.value.filter(o => o.menuType == 2)


            menusList.forEach((o) => {
                let viewComponent = modules[/* @vite-ignore */`../views${o.viewUrl}`]
                if (o.viewUrl && o.url) {
                    const menu = {
                        path: o.url,
                        name: o.menuName,
                        component: viewComponent// () => import(/* @vite-ignore */`${o.viewUrl}`)
                    }
                    routeList.push(menu)
                }
            })
        }
        return routeList
    }

    const GetRecursionMenuList = (parentId: string, list: Array<any>) => {
        if (parentId && parentId != "") {
            const childList = list.filter(o => o.parentId == parentId)
            childList.forEach(o => {
                const arr = GetRecursionMenuList(o.id, list)
                if (arr) {
                    o.children = arr;
                }
            })
            return childList
        } else {
            const rootList = []
            list.forEach(o => {

                if (o.parentId == undefined || o.parentId == "") {
                    rootList.push(o)
                    return
                }
                let hasParent = false
                list.forEach(x => {
                    if (o.parentId == x.id) {
                        hasParent = true
                        return
                    }
                })
                if (!hasParent) {
                    rootList.push(o)
                }
            })

            rootList.forEach(o => {
                const childList = GetRecursionMenuList(o.id, list)
                if (childList) {
                    o.children = childList
                }
            })
            return rootList
        }
    }

    const clear = () => {
        accessToken.value = ""
        refreshToken.value = ""
        username.value = ""
        menus.value = []

        window.localStorage.clear()
        window.sessionStorage.clear()
    }

    const isLoggedin = computed(() => {
        if (username.value && accessToken.value && refreshToken.value && menus.value.length > 0) {
            return true
        }

        return false
    })

    return { username, isLoggedin, menus, accessToken, refreshToken, getHomeMenu, getRouterList, clear, GetUserInfoFormApi }

}, {
    //持久化
    persist: {
        storage: localStorage
    }
})