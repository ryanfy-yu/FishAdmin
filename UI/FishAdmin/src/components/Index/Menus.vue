<template>
  <el-menu :default-active="homeMenusStore.defaultActive" :collapse="homeMenusStore.isCollapse"
  :style="{width:(homeMenusStore.isCollapse? 'auto' : '220px')}"
  >
    <MenusTree :menuTree="homeMenusStore.menuList" />
  </el-menu>
</template>
<script lang="ts" setup>
import { useHomeMenusStore } from '@/stores/homeMenus'

//import { useUserInfoStore } from "@/stores/userInfo"

const homeMenusStore = useHomeMenusStore()

</script>

<style scoped>
/* 去除多余border */
.el-menu {

  border: none;
  user-select: none;
  font-weight: bold
}
</style>