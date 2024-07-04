<template>
  <el-menu vue-router="true" class="el-menu-vertical">
    <MenusTree :menuTree="menusList" />
  </el-menu>

</template>
<script lang="ts" setup>
import { useHomeMenusStore } from '@/stores/homeMenus'
import {useUserInfoStore} from "@/stores/userInfo"

//const homeMenusStore = useHomeMenusStore()
const userInfoStore = useUserInfoStore()
const menusList = userInfoStore.getHomeMenu()


//homeMenusStore.menuList.values = userInfoStore.menus.values

</script>

<style scoped>
.el-menu {
  /* 去除多余border */
  border: none;
  user-select: none;
  font-weight: bold
}
</style>