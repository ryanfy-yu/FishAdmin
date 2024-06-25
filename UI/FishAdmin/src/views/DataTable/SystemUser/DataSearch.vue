<template>
  <el-form inline label-width="auto">

    <template v-for="item in searchList">
      <el-form-item v-if="item.formField == 'input'" :label="item.label">
        <el-input v-model="item.value" />
      </el-form-item>
    </template>

  </el-form>
  <div>
    <el-button type="primary" @click="onSubmit">Search</el-button>
    <el-button>Reset</el-button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const searchList = ref<Array<any>>([])

const dataLoad = function (tableColumn: Array<any>) {
  let list = <Array<any>>[]
  //searchList.value = tableColumn

  tableColumn.forEach(item => {

    if (item.queryable) {
      list.push({ index: item.index, prop: item.prop, label: item.label, formField: item.formField, value: '' })
    }
  })

  searchList.value = list.sort((a, b) => a.index - b.index)

}



const onSubmit = () => {
  let list = <Array<any>>[]

  searchList.value.forEach(o => {
    if (o.value != "") {
      list.push({ prop: o.prop, value: o.value })
    }
  })

  emits("clickSearch", list)
  //console.log('submit!')
}

const emits = defineEmits(["clickSearch"])

defineExpose({ dataLoad })
</script>
