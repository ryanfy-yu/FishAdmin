import { defineStore } from 'pinia'
import { ref } from 'vue'
import httpRequest from '@/scripts/httpRequest'
import { tableConfig } from "@/scripts/tableConfig/dictionaries"


// 你可以任意命名 `defineStore()` 的返回值，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。
// (比如 `useUserStore`，`useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID。
export const useSelectionStore = defineStore('selection', () => {

    const dictionaries = ref<any>([])

    const menus = ref<any>([])

    const init = () => {
        if (dictionaries.value.length < 1) {
            httpRequest.get("http://localhost:5198/Selection", {}).then(function (response) {
                if (response.data.isSuccess) {
                    dictionaries.value = response.data.data
                }
            })
        }

        if (menus.value.length < 1) {
            httpRequest.get("http://localhost:5198/MenuCascader", {}).then(function (response) {
                if (response.data.isSuccess) {
                    menus.value = response.data.data
                }
            })
        }
    }

    const GetSelectionText = (selectOrigin: string, cellValue: object) => {

        const item = dictionaries.value.find(o => o.groupName == selectOrigin && o.value == cellValue) || ""
        if (item) {
            return item.label
        }

        return ""

    }

    const GetSelectionOptions = (selectOrigin: string) => {
        let result = []

        dictionaries.value.forEach(o => {
            if (o.groupName == selectOrigin) {

                result.push({ label: o.label, value: o.value })
            }
        })
        return result
    }

    const GetCascaderOptions = (selectOrigin: string) => {
        let result = []
        switch (selectOrigin) {
            case "menu":
                result = GetMenuOptions("", menus.value)

                break;

            default:
                break;
        }
        return result
    }


    const GetMenuOptions = (parentId: string, menus: Array<any>) => {

        if (parentId) {
            const childList = menus.filter(o => o.parentId == parentId)
            childList.forEach(o => {
                const arr = GetMenuOptions(o.id, menus)

                if (arr) arr.forEach(x => {
                    o.children = []
                    o.children.push({ label: x.menuName, value: x.id })
                })
            })
            return childList
        } else {

            const rootList = menus.filter(o => o.parentId == undefined || o.parentId == "")
            let resultList = []
            rootList.forEach(o => {

                const root = { label: o.menuName, value: o.id, children: [] }

                const childList = GetMenuOptions(o.id, menus)

                if (childList) childList.forEach(x => {
                    root.children.push({ label: x.menuName, value: x.id })
                })

                resultList.push(root)
            })

            return resultList

        }

    }

    return { GetSelectionText, GetSelectionOptions, GetCascaderOptions, init }

}, {
    //持久化
    persist: {
        storage: sessionStorage
    }
})
