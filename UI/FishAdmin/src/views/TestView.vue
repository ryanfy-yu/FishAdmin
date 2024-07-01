<template>

    <el-form label-width="auto" style="max-width: 600px;margin: 20px;">
        <el-form-item label="菜单级联选择">
            <MenuNodeSelector v-model="menuSelector" @change="onChangeMenuNodeSelector" />
        </el-form-item>
        <el-form-item label="菜单级联值">
            {{ menuSelector }}
        </el-form-item>
        <el-form-item label="菜单级联赋值">
            <el-input v-model="menuinput" placeholder="Please input" />
            <el-button type="primary" @click="menuButton">赋值</el-button>
        </el-form-item>
    </el-form>

    <el-divider />

  </template>
<script lang="ts" setup>
import MenuNodeSelector from "@/components/System/MenuNodeSelector.vue"
import { ref } from 'vue';

const menuSelector = ref([])
const menuinput = ref("")
const menuButton = () => {


                menuSelector.value = menuinput.value

}
const onChangeMenuNodeSelector = () => {

}

</script>