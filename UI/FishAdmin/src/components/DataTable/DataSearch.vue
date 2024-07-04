<template>
  <el-collapse>
    <el-collapse-item>
      <template #title>
        <el-icon class="header-icon">
          <Search />
        </el-icon>
      </template>
      <el-form inline label-width="auto">

        <template v-for="item in searchList">
          <template v-if="item.queryable">

            <el-form-item v-if="item.formField == 'datetime'" :label="item.label" :prop="item.prop">
              <el-date-picker v-model="item.value" type="datetimerange" :default-time="defaultTime"
                value-format="YYYY-MM-DD HH:mm" time-format="HH:mm" format="YYYY-MM-DD HH:mm" style="width: 300px;" />
            </el-form-item>

            <el-form-item v-else-if="item.formField == 'MenuNodeSelector'" :label="item.label" :prop="item.prop">
              <MenuNodeSelector v-model="item.value" />
            </el-form-item>

            <el-form-item v-else :label="item.label" :prop="item.prop">
              <el-input v-model="item.value" />
            </el-form-item>
          </template>

        </template>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button @click="onReset">清空</el-button>
        </el-form-item>



      </el-form>
    </el-collapse-item>
  </el-collapse>





</template>

<script lang="ts" setup>
import { ref } from 'vue'
import MenuNodeSelector from '@/components/System/MenuNodeSelector.vue'



const defaultTime = ref<[Date, Date]>([
  new Date(2000, 1, 1, 0, 0, 0),
  new Date(2000, 2, 1, 23, 59, 59),
])


const searchList = ref<Array<any>>([])

const dataLoad = function (tableConfig: any) {

  let list: Array<any> = []

  tableConfig.columns.forEach(column => {
    let entity: any = {}

    entity = column
    entity.value = ""//column.defaultValue

    list.push(entity)
  })

  searchList.value = list.sort((a, b) => a.index - b.index)

}


// const selectionStore = useSelectionStore()
// const getOptions = (item) => {

//   const list = selectionStore.GetSelectionOptions(item.selectOrigin)

//   if (list) return list
//   return []

// }

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
