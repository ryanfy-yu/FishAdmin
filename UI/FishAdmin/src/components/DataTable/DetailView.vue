<template>
  <el-drawer v-model="isShow" size="50%" :show-close="false" title="详情">
    <el-descriptions :column="1" border>

      <template v-for="item in detail">
        <el-descriptions-item v-if="item.formField == 'select'" :label="item.label">
          {{ columnFormat(item) }}
        </el-descriptions-item>
        <el-descriptions-item v-else :label="item.label">{{ item.value }}</el-descriptions-item>

      </template>
    </el-descriptions>
  </el-drawer>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useSelectionStore } from '@/stores/selection'


//const props = defineProps({ data: Object })

const detail = ref<any>([])
const isShow = ref(false)

const selectionStore = useSelectionStore()
const columnFormat = (item) => {

  const text = selectionStore.GetSelectionText(item.selectOrigin, item.value)

  if (text) return text
  return item.value

}


const dataLoad = function (item: any, tableConfig: any) {
  isShow.value = true
  let list = []
  for (const key in item) {

    const column = tableConfig.columns.find(o => o.prop == key)

    if (column) {
      list.push({ label: column.label, value: item[key], index: column.index, selectOrigin: column.selectOrigin, formField: column.formField })
    }
  }
  detail.value = list.sort((a, b) => a.index - b.index)

}

defineExpose({ dataLoad })

</script>