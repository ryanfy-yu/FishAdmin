<template>
  <el-drawer v-model="isShow" size="50%" :show-close="false" title="详情">
    <el-descriptions :column="1" border>

      <el-descriptions-item v-for="item in detail" :label="item.label">{{ item.value }}</el-descriptions-item>


    </el-descriptions>
  </el-drawer>
</template>

<script lang="ts" setup>

import { ref, watch } from 'vue'


//const props = defineProps({ data: Object })

const detail = ref<any>([])
const isShow = ref(false)


const dataLoad = function (item: any, tableColumn: Array<any>) {
  isShow.value = true
  let list = []
  for (const key in item) {

    const column = tableColumn.find(o => o.prop == key)

    list.push({ label: column.label, value: item[key], index: column.index })
  }
  detail.value = list.sort((a, b) => a.index - b.index)

}

defineExpose({ dataLoad })

</script>