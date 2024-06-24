import { defineStore } from 'pinia'
import { ref } from 'vue'

// 你可以任意命名 `defineStore()` 的返回值，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。
// (比如 `useUserStore`，`useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID。
export const useUserInfoStore = defineStore('SystemUserInfo', () => {

    const accessToken = ref("")
    const refreshToken = ref("")
    const username = ref("")
    //const userInfo = ref<UserInfoType>()

    const clear = function () {

        accessToken.value = ""
        refreshToken.value = ""
        username.value = ""
        sessionStorage.removeItem("SystemUserInfo")

    }


    return { username, accessToken, refreshToken, clear }

}, {
    //持久化
    persist: {
        storage: localStorage
    }
})