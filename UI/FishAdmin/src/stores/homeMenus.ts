import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useHomeTabsStore } from "@/stores/homeTabs"
import { useUserInfoStore } from '@/stores/userInfo'


// 你可以任意命名 `defineStore()` 的返回值，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。
// (比如 `useUserStore`，`useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID。
export const useHomeMenusStore = defineStore('homeMenus', () => {

    //const router = useRouter()
    const userInfoStore = useUserInfoStore()

    const menuList = userInfoStore.getHomeMenu()

    const defaultActive = ref("")

    const homeTabsStore = useHomeTabsStore()

    const clickMenuItem = function (menuItem: any) {

        defaultActive.value = menuItem.index

        homeTabsStore.addTab({
            index: menuItem.index,
            title: menuItem.title,
            icon: menuItem.icon,
            path: menuItem.path,
        })
    }

    const clear = function () {

        //menuList.values = []
        defaultActive.value = ""
        sessionStorage.removeItem("homeMenus")

    }

    return { menuList, defaultActive, clickMenuItem, clear }
}, {
    //持久化
    persist: {
        storage: localStorage
    }
})