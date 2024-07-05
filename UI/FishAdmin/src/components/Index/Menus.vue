<template>
  <el-menu :default-active="homeMenusStore.defaultActive" :collapse="homeMenusStore.isCollapse"
  :style="{width:(homeMenusStore.isCollapse? 'auto' : '220px')}"
  >
    <MenusTree :menuTree="homeMenusStore.menuList" />
  </el-menu>
  <!-- <el-menu default-active="2" class="el-menu-vertical-demo" :collapse="homeMenusStore.isCollapse"
    active-text-color="#409EFF" background-color="#141414" text-color="#fff">
    <el-sub-menu index="1">
      <template #title>
        <el-icon>
          <location />
        </el-icon>
        <span>Navigator One</span>
      </template>

<el-menu-item index="1-1">item one</el-menu-item>
<el-menu-item index="1-2">item two</el-menu-item>
<el-menu-item index="1-3">item three</el-menu-item>

<el-sub-menu index="1-4">
  <template #title><span>item four</span></template>
  <el-menu-item index="1-4-1">item one</el-menu-item>
</el-sub-menu>
</el-sub-menu>
<el-menu-item index="2">
  <el-icon><icon-menu /></el-icon>
  <template #title>Navigator Two</template>
</el-menu-item>
<el-menu-item index="3" disabled>
  <el-icon>
    <document />
  </el-icon>
  <template #title>Navigator Three</template>
</el-menu-item>
<el-menu-item index="4">
  <el-icon>
    <setting />
  </el-icon>
  <template #title>Navigator Four</template>
</el-menu-item>
</el-menu>-->
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