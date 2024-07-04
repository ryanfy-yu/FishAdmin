<!-- 菜单级联选择 -->
<template>
    <el-cascader v-model="cascaderModel" :props="cascaderProps" clearable @change="thisChange" placeholder="/"
        :options="OptionData" style="width: 100%;">
        <template #default="{ node, data }">
            <span>{{ data.label }}</span>
            <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
        </template>
    </el-cascader>

</template>

<script lang="ts" setup>
import { ref } from 'vue'
import httpRequest from '@/scripts/httpRequest'


const cascaderModel = defineModel()
const OptionData = ref([])
const getOptions = () => {
    httpRequest.get("/MenuNodeSelector", {}).then(function (response) {
        if (response.data.isSuccess) {
            OptionData.value = GetMenuOptions("", response.data.data)
        }
    })
}
getOptions()


const cascaderProps = {
    checkStrictly: true,
    emitPath: false
}


const thisChange = (value: Array<string>) => {
    if (value == undefined) {
        value == ""
        cascaderModel.value = ""
    }

    emits("change", value)
}

//递归方法
const GetMenuOptions = (parentId: string, menus: Array<any>) => {
    if (parentId) {
        const childList = menus.filter(o => o.parentId == parentId)
        childList.forEach(o => {
            const arr = GetMenuOptions(o.id, menus)

            if (arr) arr.forEach(x => {
                o.children = []
                o.children.push({ label: x.menuName, value: x.id })
            })
        })
        return childList
    } else {

        const rootList = menus.filter(o => o.parentId == undefined || o.parentId == "")
        let resultList = []
        rootList.forEach(o => {

            const root = { label: o.menuName, value: o.id, children: [] }

            const childList = GetMenuOptions(o.id, menus)

            if (childList) childList.forEach(x => {
                root.children.push({ label: x.menuName, value: x.id })
            })

            resultList.push(root)
        })
        return resultList
    }
}

const emits = defineEmits(["change"])

</script>