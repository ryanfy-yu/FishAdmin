<template>
    <!-- 整体背景 -->
    <div class="common-layout">
        <el-container>
            <el-main>
                <el-row class="row-bg" justify="center" align="middle" style="height: 100%;">
                    <el-col :span="6" style="min-width: 400px;">
                        <div class="grid-content title">
                            Login
                        </div>

                        <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="auto"
                            class="demo-ruleForm" status-icon @keyup.enter="submitForm(ruleFormRef)">
                            <el-form-item prop="username">
                                <el-input v-model="ruleForm.username" laceholder="请输入用户名或者邮箱" aria-label="请输入用户名或者邮箱" />
                            </el-form-item>

                            <el-form-item prop="password">
                                <el-input v-model="ruleForm.password" type="password" laceholder="请输入密码"
                                    aria-label="请输入用户名或者邮箱" />
                            </el-form-item>
                            <el-form-item>
                                <el-button size="large" style="margin: auto" :loading="isLoding" round
                                    @click="submitForm(ruleFormRef)">
                                    Login
                                </el-button>
                            </el-form-item>

                        </el-form>

                    </el-col>
                </el-row>
            </el-main>
        </el-container>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import httpRequest from '@/scripts/httpRequest'
import { useUserInfoStore } from '@/stores/userInfo';
import { ElMessage } from 'element-plus'
import type { ComponentSize, FormInstance, FormRules } from 'element-plus'

interface RuleForm {
    username: string | null
    password: string | null
}

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
    username: null,
    password: null,
})

const rules = reactive<FormRules<RuleForm>>({
    username: [
        { required: true, message: '请输入用户名或邮箱', trigger: 'blur' },
        { min: 5, max: 16, message: '长度5到16', trigger: 'blur' },
    ],
    password: [
        {
            required: true,
            message: '请输入密码',
            trigger: 'blur',
        },
        { min: 5, max: 16, message: '长度5到16位', trigger: 'blur' },
    ]
})


const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {

            submitToLogin()

            console.log('submit!')
        } else {
            console.log('error submit!', fields)
        }
    })
}


const isLoding = ref(false)

const userinfoStore = useUserInfoStore()
const router = useRouter()


const submitToLogin = () => {

    isLoding.value = true;

    httpRequest.post("http://localhost:5142/api/Login",
        {
            UsernameOfEmail: ruleForm.username,
            Password: ruleForm.password
        })
        .then(function (response) {
            // 处理成功情况
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
                }, 1000)
            }

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



.demo-ruleForm {
    padding: 15px;
    text-align: center;
}

.el-form-item {

    padding: 5px;
}


.title {
    color: #E5EAF3;
    font-size: 48px;
    text-align: center;
}
</style>