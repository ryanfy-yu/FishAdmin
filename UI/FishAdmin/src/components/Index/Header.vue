<template>



  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false"
    @select="handleSelect">
    <el-menu-item>
      <!-- <img style="width: 100px" src="https://element-plus.org/images/element-plus-logo.svg" alt="Element logo" /> -->

      <el-icon @click="collapseClick"><Fold /></el-icon>
      <!-- <el-icon><Fold /></el-icon> -->
    </el-menu-item>
    <div class="flex-grow">

    </div>
    <el-menu-item>
      <el-switch v-model="isDark" />
    </el-menu-item>

    <el-menu-item>
      <el-dropdown>

        <div class="el-dropdown-link">
          <span class="header-username">{{ userInfoStore.username }}</span>
          <el-icon>
            <Setting />
          </el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人资料</el-dropdown-item>
            <el-dropdown-item>锁屏</el-dropdown-item>
            <el-dropdown-item @click="logoutDialogVisible = true">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-menu-item>
  </el-menu>


  <el-dialog v-model="logoutDialogVisible" title="警告" width="500" align-center center>
    <span style="text-align: center;">确认退出系统？</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="logoutDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="logout">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useDark } from "@vueuse/core"
import { useUserInfoStore } from '@/stores/userInfo';
import { useHomeMenusStore } from '@/stores/homeMenus';
import { useRouter } from 'vue-router';
import { Fold  } from '@element-plus/icons-vue'
const logoutDialogVisible = ref(false)
const userInfoStore = useUserInfoStore()
const homeMenusStore = useHomeMenusStore()
const router = useRouter()


const collapseClick=()=>{

  homeMenusStore.isCollapse = !homeMenusStore.isCollapse

}

const logout = () => {
  userInfoStore.clear()

  router.push("/login")

}

const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

const isDark = useDark()


</script>

<style scoped>
.flex-grow {
  flex-grow: 1;
}
</style>
