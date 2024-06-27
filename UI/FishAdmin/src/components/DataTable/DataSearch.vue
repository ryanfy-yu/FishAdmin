<template>
  <el-form inline label-width="auto">

    <template v-for="item in searchList">

      <el-form-item v-if="item.formField == 'select'" :label="item.label" :prop="item.prop">
        <el-select v-model="item.value" placeholder="未选择" style="width: 200px">
          <el-option v-for="o in getOptions(item)" :label="o.label" :value="o.value" />
        </el-select>
      </el-form-item>

      <el-form-item v-else :label="item.label">
        <el-input v-model="item.value" />
      </el-form-item>


    </template>

  </el-form>
  <div>
    <el-button type="primary" @click="onSubmit">查询</el-button>
    <el-button @click="onReset">清空</el-button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useSelectionStore } from '@/stores/selection'

const searchList = ref<Array<any>>([])

const dataLoad = function (tableConfig: any) {
  let list = <Array<any>>[]

  tableConfig.columns.forEach(item => {

    if (item.queryable) {
      list.push({ index: item.index, prop: item.prop, label: item.label, formField: item.formField, selectOrigin: item.selectOrigin, value: '' })
    }
  })

  searchList.value = list.sort((a, b) => a.index - b.index)

}


const selectionStore = useSelectionStore()
const getOptions = (item) => {

  const list = selectionStore.GetSelectionOptions(item.selectOrigin)

  if (list) return list
  return []

}

const onReset = () => {
  searchList.value.forEach(o => o.value = "")

}

const onSubmit = () => {

  interface obj {
    [idx: string]: any
  }
  let searchBody: obj = {}
  searchList.value.forEach(o => {
    if (o.value != "") {

      searchBody[o.prop] = o.value
    }
  })

  emits("clickSearch", searchBody)

}

const emits = defineEmits(["clickSearch"])

defineExpose({ dataLoad })
</script>
