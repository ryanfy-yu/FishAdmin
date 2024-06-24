import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useHomeTabsStore } from "@/stores/homeTabs"
import { useRouter } from 'vue-router'


// 你可以任意命名 `defineStore()` 的返回值，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。
// (比如 `useUserStore`，`useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID。
export const useHomeMenusStore = defineStore('homeMenus', () => {

    const router = useRouter()

    const menuList = ref([
        {
            index: "/",
            title: '首页',
            icon: 'HomeFilled',
            path: '/index/home',
        },
        {
            index: "/system_manage",
            title: '系统管理',
            icon: 'Setting',
            path: '/index/system_manage',
            children: [
                {
                    index: '/case_mafnage',
                    title: '用户管理',
                    icon: 'Document',
                    path: '/index/datalist/usermanage',
                },
                {
                    index: '/person_involfved',
                    title: '菜单管理',
                    icon: 'Document',
                    path: '/index/datalist/menumanage',
                }
            ]
        },
        {
            index: "/person",
            title: '事物管理',
            icon: 'search',
            children: [
                {
                    index: '5',
                    title: '物件管理',
                    icon: 'Document',
                    path: '/index/caaaaase_manage',
                },
                {
                    index: '6',
                    title: '物件研判',
                    icon: 'Document',
                    path: '/index/datalist',
                }
            ]
        },
        {
            index: "search",
            title: '一键搜',
            icon: 'Document',
            path: '/search',
        }])

    const defaultActive = ref("")

    let homeTabsStore = useHomeTabsStore()

    //激活首页
    const setDefaultActive = function () {

        router.isReady().then(() => {

            let menu = menuList.value.find(o => o.index == "/home") || menuList.value[0]

            homeTabsStore.addTab({
                index: menu.index,
                title: menu.title,
                icon: menu.icon,
                path: menu.path,
                isCloseable: false
            })

            defaultActive.value = menu.index
            router.push(menu.path || "/index/home")
        }
        )
    }




    const clickMenuItem = function (menuItem: any) {

        defaultActive.value = menuItem.index

        homeTabsStore.addTab({
            index: menuItem.index,
            title: menuItem.title,
            icon: menuItem.icon,
            path: menuItem.path,
            isCloseable: true
        })


    }



    return { menuList, defaultActive, clickMenuItem, setDefaultActive }
})