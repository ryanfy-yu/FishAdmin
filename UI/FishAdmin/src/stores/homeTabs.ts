import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import TabType from "@/scripts/TsType/tab"


// 你可以任意命名 `defineStore()` 的返回值，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。
// (比如 `useUserStore`，`useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID。
export const useHomeTabsStore = defineStore('homeTabs', () => {
    const router = useRouter()

    //定义tab内容结构
    const activeTab = ref("0")
    // const tabIndex = ref(0);//获取最大tabindex数

    const tabsData = ref<TabType[]>([])

    const removeTab = (targetName: string) => {
        const tabs = tabsData.value
        let activeName = activeTab.value
        if (activeName === targetName) {
            tabs.forEach((tab, index) => {
                if (tab.name === targetName) {
                    const nextTab = tabs[index + 1] || tabs[index - 1]
                    if (nextTab) {
                        router.push(nextTab.path)
                        activeName = nextTab.name
                    }
                }
            })
        }

        activeTab.value = activeName
        tabsData.value = tabs.filter((tab) => tab.name !== targetName)

    }
    const addTab = (menu: any) => {

        const tabs = tabsData.value
        const tab = tabs.find((tab) => tab.name == menu.index)
        if (tab == undefined) {

            //const netTabname = tabIndex.value++
            activeTab.value = menu.index
            tabsData.value.push({
                //menuIndex: menu.index,
                title: menu.title,
                name: menu.index,
                //content: menu.content,
                icon: menu.icon,
                path: menu.path,
                //isCloseable: menu.isCloseable
            });

            router.push(menu.path)

        } else {
            router.push(tab.path)
            activeTab.value = tab.name
        }
    }

    const clear = function () {

        activeTab.value = "0"
        // tabIndex.value = 0
        tabsData.value = []
        sessionStorage.removeItem("homeTabs")

    }

    return { tabsData, activeTab, removeTab, addTab, clear }
}, {
    //持久化
    persist: {
        storage: localStorage
    }
})