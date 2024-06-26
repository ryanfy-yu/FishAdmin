<template>
    <el-drawer v-model="isShow" size="50%" title="编辑" direction="ltr" :before-close="handleClose">
        <el-form label-width="auto">
            <template v-for="item in detail">
                <el-form-item v-if="item.formField == 'input'" :label="item.label" :prop="item.prop">
                    <el-input v-model="item.value" :disabled="!item.editable" />
                </el-form-item>
            </template>
            <el-form-item>
                <el-button @click="resetForm()">重置</el-button>
                <el-button type="primary" @click="submitForm()">确定</el-button>
            </el-form-item>
        </el-form>
    </el-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElDrawer, ElMessageBox, ElMessage } from 'element-plus'
import httpRequest from '@/scripts/httpRequest'

const detail = ref<Array<any>>([])
const isShow = ref(false)

let _item: any = {}
let _tableColumn: Array<any> = []
let _config: any = {}

const dataLoad = function (item: any, tableColumn: Array<any>, config: any) {
    _item = item
    _tableColumn = tableColumn
    _config = config


    isShow.value = true
    let list = []
    for (const key in item) {

        const column = tableColumn.find(o => o.prop == key)
        if (column) list.push({ prop: column.prop, editable: column.editable, required: column.required, label: column.label, value: item[key], formField: column.formField, index: column.index })

    }
    detail.value = list.sort((a, b) => a.index - b.index)

}

const handleClose = (done: Function) => {
    emits("callback")
    done()
}

const saveData = () => {

    let data: { [key: string]: object } = {};
    detail.value.forEach(item => {
        data[item.prop] = item.value
    });
    httpRequest.put(_config.putUrl, data

    ).then(function (response) {
        if (response.data.isSuccess) {
            ElMessage({
                message: "保存成功！",
                type: 'success',
            })

        } else {
            ElMessage({
                message: "保持失败！消息：" + response.data.error,
                type: 'success',
            })

        }
    })
}


const submitForm = () => {
    ElMessageBox.confirm(`确定提交修改？`)
        .then(() => {
            saveData()

        })
}

const resetForm = () => {

    ElMessageBox.confirm(`确定重置？`)
        .then(() => {
            dataLoad(_item, _tableColumn, _config)

        })
}

const emits = defineEmits(["callback"])

defineExpose({ dataLoad })

</script>