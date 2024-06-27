import { defineStore } from 'pinia'
import { ref } from 'vue'
import httpRequest from '@/scripts/httpRequest'
import { tableConfig } from "@/scripts/tableConfig/dictionaries"


// 你可以任意命名 `defineStore()` 的返回值，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。
// (比如 `useUserStore`，`useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID。
export const useSelectionStore = defineStore('selection', () => {

    const dictionaries = ref([])

    const init = () => {
        if (dictionaries.value.length < 1) {
            httpRequest.get("http://localhost:5198/Selection", {}).then(function (response) {
                if (response.data.isSuccess) {
                    dictionaries.value = response.data.data
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
        // const list = dictionaries.value.filter(o => o.groupName == selectOrigin )

        dictionaries.value.forEach(o => {
            if (o.groupName == selectOrigin) {

                result.push({ label: o.label, value: o.value })

            }
        })
        return result

    }


    return { GetSelectionText, GetSelectionOptions, init }

}, {
    //持久化
    persist: {
        storage: sessionStorage
    }
})