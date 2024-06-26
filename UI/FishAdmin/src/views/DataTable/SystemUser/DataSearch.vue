<template>
  <el-form inline label-width="auto">

    <template v-for="item in searchList">
      <el-form-item v-if="item.formField == 'input'" :label="item.label">
        <el-input v-model="item.value" />
      </el-form-item>
    </template>

  </el-form>
  <div>
    <el-button type="primary" @click="onSubmit">查询</el-button>
    <el-button @click="onReset" >清空</el-button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const searchList = ref<Array<any>>([])

const dataLoad = function (tableColumn: Array<any>) {
  let list = <Array<any>>[]

  tableColumn.forEach(item => {

    if (item.queryable) {
      list.push({ index: item.index, prop: item.prop, label: item.label, formField: item.formField, value: '' })
    }
  })

  searchList.value = list.sort((a, b) => a.index - b.index)

}

const onReset=()=>{
  searchList.value.forEach(o=>o.value="")

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
  //console.log('submit!')
}

const emits = defineEmits(["clickSearch"])

defineExpose({ dataLoad })
</script>
