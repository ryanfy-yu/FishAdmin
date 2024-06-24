<template>
  <el-menu vue-router="true" class="el-menu-vertical" :default-active="homeMenusStore.defaultActive">
    <MenusTree :menuTree="homeMenusStore.menuList" />
  </el-menu>

</template>
<script lang="ts" setup>
import { useHomeMenusStore } from '@/stores/homeMenus'

const homeMenusStore = useHomeMenusStore()

</script>

<style scoped>
.el-menu {
  /* 去除多余border */
  border: none;
  user-select: none;
  font-weight: bold
}
</style>