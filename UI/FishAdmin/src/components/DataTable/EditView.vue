<template>
    <el-drawer v-model="isShow" size="50%" title="编辑" direction="ltr" :before-close="handleClose">
        <el-form label-width="auto">
            <template v-for="item in detail">
                <template v-if="item.editable">

                    <el-form-item v-if="item.formField == 'select'" :label="item.label" :prop="item.prop">
                        <el-select v-model="item.value" placeholder="未选择" :disabled="!item.editable">
                            <el-option v-for="o in selectionStore.GetSelectionOptions(item.selectOrigin)"
                                :label="o.label" :value="o.value" />
                        </el-select>
                    </el-form-item>

                    <el-form-item v-else-if="item.formField == 'cascader'" :label="item.label" :prop="item.prop">

                        <el-cascader v-model="item.value" :disabled="!item.editable" :props="cascaderProps" clearable
                            :options="selectionStore.GetCascaderOptions(item.selectOrigin)" />
                    </el-form-item>

                    <el-form-item v-else-if="item.formField == 'number'" :label="item.label" :prop="item.prop">
                        <el-input type="number" v-model="item.value" :disabled="!item.editable" />
                    </el-form-item>

                    <el-form-item v-else :label="item.label" :prop="item.prop">
                        <el-input v-model="item.value" :disabled="!item.editable" />
                    </el-form-item>
                </template>

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
import { useSelectionStore } from '@/stores/selection'

const detail = ref<Array<any>>([])
const isShow = ref(false)

let _item: any = {}
// let _tableColumn: Array<any> = []
let _tableConfig: any = {}

const selectionStore = useSelectionStore()
const cascaderOptions = (selectOrigin: string) => {

    const list = selectionStore.GetCascaderOptions(selectOrigin)
    alert(JSON.stringify(list))
    console.log(list)
    if (list) return list
}
const cascaderProps = {
    checkStrictly: true,
}

const dataLoad = function (item: any, tableConfig: any) {
    _item = item

    _tableConfig = tableConfig

    isShow.value = true
    let list: Array<any> = []

    tableConfig.columns.forEach(column => {
        let entity: any = {}
        for (const key in item) {

            if (column.prop == key) {
                entity = column
                entity.value = item[key] ? item[key].toString() : ""

                list.push(entity)
            }

        }
    })

    detail.value = list.sort((a, b) => a.index - b.index)

}

const handleClose = (done: Function) => {
    done()
}

const saveData = () => {

    let data: { [key: string]: object } = {};
    detail.value.forEach(item => {
        data[item.prop] = item.value
    });


    httpRequest.put(_tableConfig.putUrl, data

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
            setTimeout(() => {
                emits("callback")
            }, 3000);


        })
}

const resetForm = () => {

    ElMessageBox.confirm(`确定重置？`)
        .then(() => {
            dataLoad(_item, _tableConfig)

        })
}

const emits = defineEmits(["callback"])

defineExpose({ dataLoad })

</script>