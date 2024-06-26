<template>
  <div class="common-layout">
    <el-container>
      <el-header style="height: 60px;">
        <HomeHeader />
      </el-header>
      <el-container>
        <el-aside>
          <HomeMenus />
        </el-aside>
        <el-container>
          <el-main style="height: 100%;
  overflow: hidden;
  ">
            <HomeTabs />
          </el-main>
          <el-footer style="height: 30px;">
            <div class="div-foot">Ryan Fuyuan Yu</div>
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import HomeMenus from '@/components/Index/Menus.vue'
import HomeHeader from '@/components/Index/Header.vue'
import HomeTabs from '@/components/Index/Tabs.vue'
import { useUserInfoStore } from '@/stores/userInfo';
import { useHomeMenusStore } from '@/stores/homeMenus';
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import httpRequest from '@/scripts/httpRequest'

const userinfoStore = useUserInfoStore()
const router = useRouter()
//const menusStore = useHomeMenusStore()
const checkLogined = () => {

  if (userinfoStore.accessToken == "") {
    router.isReady().then(() => {

      ElMessage.error("未登录，请先登陆！")

      router.push("/login")
    })
  }

  httpRequest.get("http://localhost:5142/api/TokenValid", {})
    .then(function (response) {
      if (!response.data.isSuccess) {
        ElMessage.error("未登录，请先登陆！")

        router.push("/login")
      }
    })
}



const dataLoad = () => {
  //checkLogined()
  const homeMenusStore = useHomeMenusStore()
  homeMenusStore.menuList = [
    {
      index: "0",
      title: '首页',
      icon: 'HomeFilled',
      path: '/home',
    },
    {
      index: "1",
      title: '系统管理',
      icon: 'Setting',
      path: '/system_manage',
      children: [
        {
          index: '2',
          title: '用户管理',
          icon: 'Document',
          path: '/datalist/usermanage',
        },
        {
          index: '3',
          title: '菜单管理',
          icon: 'Document',
          path: '/datalist/menumanage',
        }
      ]
    },
    {
      index: "4",
      title: '事物管理',
      icon: 'search',
      children: [
        {
          index: '5',
          title: '物件管理',
          icon: 'Document',
          path: '/caaaaase_manage',
        },
        {
          index: '6',
          title: '物件研判',
          icon: 'Document',
          path: '/datalist',
        }
      ]
    },
    {
      index: "7",
      title: '一键搜',
      icon: 'Document',
      path: '/search',
    }]

}

dataLoad()
</script>


<style scoped>
.el-aside {
  border-right: 1px solid var(--el-border-color);
  width: 200px;
}

.el-footer {
  border-top: 1px solid var(--el-border-color);


}

.common-layout {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.el-container {
  height: 100%;
  overflow: hidden;
}

.div-foot {
  padding-top: 5px;
  text-align: center;
}
</style>