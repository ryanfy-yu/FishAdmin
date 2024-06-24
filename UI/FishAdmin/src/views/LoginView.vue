<template>
    <!-- 整体背景 -->
    <div class="common-layout">
        <el-container>
            <el-main>
                <el-row class="row-bg" justify="center" align="middle" style="height: 100%;">
                    <el-col :span="6" @keyup.enter="submitToLogin">
                        <div class="grid-content title">
                            Login
                        </div>
                        <div class="grid-content">
                            <el-input v-model="usernameOfEmail" style="width: 100%" placeholder="请输入用户名或者邮箱" />
                        </div>
                        <div class="grid-content">
                            <el-input v-model="password" type="password" style="width: 100" placeholder="请输入密码" />
                        </div>
                        <div class="grid-content">

                            <el-button size="large" style="margin: auto" :loading="isLoding" round
                                :disabled="validateForm" @click="submitToLogin">Login</el-button>
                        </div>
                    </el-col>
                </el-row>

            </el-main>
        </el-container>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import httpRequest from '@/scripts/httpRequest'
import { useUserInfoStore } from '@/stores/userInfo';
import { ElMessage } from 'element-plus'

const usernameOfEmail = ref("")
const password = ref("")
const isLoding = ref(false)

const userinfoStore = useUserInfoStore()
const router = useRouter()


const submitToLogin = () => {

    if (!validateForm) return;

    isLoding.value = true;

    httpRequest.post("http://localhost:5142/api/Login",
        {
            UsernameOfEmail: usernameOfEmail.value,
            Password: password.value
        })
        .then(function (response) {
            // 处理成功情况
            //console.log(response.data.data);
            if (response.data.isSuccess) {
                userinfoStore.accessToken = response.data.data.access_token
                userinfoStore.refreshToken = response.data.data.refresh_token
                userinfoStore.username = response.data.data.username

                ElMessage({
                    message: "登陆成功，跳转首页！",
                    type: 'success',
                })

                //2秒跳转
                setInterval(() => {

                    router.push("/index")

                }, 2000)


            }
            // else {
            //     ElMessage.error(response.data.message)
            // }
        })
        .catch(function (error) {
            // 处理错误情况
            ElMessage.error(error)
            console.log(error);
        })
        .finally(function () {
            isLoding.value = false;
        });

}

const validateForm = computed(() => {
    return usernameOfEmail.value === "" || password.value === ""
})


</script>

<style scoped>
.common-layout {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: url('../assets/background.jpg');
}

.el-container {
    height: 100%;
    overflow: hidden;
}

.el-col {
    border-radius: 10px;
    background-color: #1D1D1D;
    padding: 20px;
    opacity: 0.8;
}

.grid-content {
    padding: 15px;
    text-align: center;

}

.title {
    color: #E5EAF3;
    font-size: 48px;
}
</style>