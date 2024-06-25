<template>
    <el-drawer v-model="isShow" size="50%" title="编辑" show-close="false" direction="ltr" :before-close="handleClose">
        <el-descriptions :column="1" border>

            <el-descriptions-item v-for="item in detail" :label="item.label">{{ item.value }}</el-descriptions-item>

        </el-descriptions>

        <template #footer>
            <div style="flex: auto">
                <el-button type="primary" @click="confirmClick">确定</el-button>
            </div>
        </template>
    </el-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElDrawer, ElMessageBox } from 'element-plus'


const detail = ref<any>([])
const isShow = ref(false)

const dataLoad = function (item: any, tableColumn: Array<any>) {
    isShow.value = true
    let list = []
    for (const key in item) {

        const column = tableColumn.find(o => o.prop == key && o.editable == true)
        if (column) list.push({ label: column.label, value: item[key], index: column.index })

    }
    detail.value = list.sort((a, b) => a.index - b.index)

}

const handleClose = (done: Function) => {
    ElMessageBox.confirm('退出将不保存任何更改，确定退出？')
        .then(() => {
            done()
        })
        .catch(() => {
            // catch error
        })
}

function confirmClick() {
  ElMessageBox.confirm(`确定提交修改？`)
    .then(() => {
        isShow.value = false
    })
    .catch(() => {
      // catch error
    })
}

defineExpose({ dataLoad })

</script>