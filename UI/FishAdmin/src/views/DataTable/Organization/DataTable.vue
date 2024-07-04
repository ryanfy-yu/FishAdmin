<template>
  <div style="padding: 15px;">


    <DataSearch ref="childSearch" @clickSearch="clickSearch"></DataSearch>



    <div class="table-button" style="padding: 15px;">
      <el-button type="primary" @click="clickAdd"> 新增 </el-button>
    </div>

    <el-scrollbar style="height: 100%;">
      <el-table :data="tableData" row-key="id" border max-height="1000px" show-overflow-tooltip
        @sort-change="sortChange">

        <el-table-column type="index" width="40" />

        <template v-for="item in tableConfig.columns">
          <template v-if="!item.hidden">

            <el-table-column :prop="item.prop" :label="item.label" sortable="custom" />

          </template>
        </template>

        <el-table-column fixed="right" label="操作" width="150" v-if="tableConfig.Operations">
          <template #default="scope">
            <el-button-group>
              <el-button link type="default" size="small"
                @click="handleClick('Detail', scope.$index, scope.row)">详细</el-button>
              <el-button link type="primary" size="small"
                @click="handleClick('Edit', scope.$index, scope.row)">编辑</el-button>
              <el-button link type="danger" size="small"
                @click="handleClick('Delete', scope.$index, scope.row)">删除</el-button>
            </el-button-group>

          </template>
        </el-table-column>
      </el-table>

      <div style="margin: auto;  padding: 20px;">
        <TablePagination ref="childPagination" @changePage="changePage" />
      </div>


    </el-scrollbar>
  </div>
  <DetailView ref="childDetail"></DetailView>
  <EditView ref="childEdit" @callback="editCallBack"></EditView>
  <AddView ref="childAdd" @callback="editCallBack"></AddView>
</template>


<script lang="ts" setup>
import { onMounted, ref } from 'vue';

//本地子組件
import DataSearch from '@/components/DataTable/DataSearch.vue'
import DetailView from '@/components/DataTable/DetailView.vue'
import EditView from '@/components/DataTable/EditView.vue'
import AddView from '@/components/DataTable/AddView.vue'
import TablePagination from '@/components/DataTable/PaginationView.vue'

//表配置，需要更換
import { tableConfig } from "@/scripts/tableConfig/organization"

import httpRequest from '@/scripts/httpRequest'
import { ElMessageBox, ElMessage } from 'element-plus'

//数据对象
const tableData = ref<Array<any>>([])

//递归菜单
const GetRecursionMenuList = (parentId: string, list: Array<any>) => {
  if (parentId && parentId != "") {
    const childList = list.filter(o => o.parentId == parentId)
    childList.forEach(o => {
      const arr = GetRecursionMenuList(o.id, list)
      if (arr) {
        o.children = arr;
      }
    })
    return childList
  } else {
    //const rootList = list.filter(o => o.parentId == undefined || o.parentId == "")
    const rootList = []
    list.forEach(o => {

      if (o.parentId == undefined || o.parentId == "") {
        rootList.push(o)
        return
      }
      let hasParent = false
      list.forEach(x => {
        if (o.parentId == x.id) {
          hasParent = true
          return
        }
      })
      if (!hasParent) {
        rootList.push(o)
      }
    })

    rootList.forEach(o => {
      const childList = GetRecursionMenuList(o.id, list)
      if (childList) {
        o.children = childList
      }
    })
    return rootList
  }
}

//组件实例
const childDetail = ref()
const childAdd = ref()
const childEdit = ref()
const childSearch = ref()
const childPagination = ref()

//列表按钮操作
const handleClick = function (opType: string, index: number, row: object) {
  switch (opType) {
    case "Detail":
      childDetail.value.dataLoad(row, tableConfig)
      break;
    case "Edit":
      childEdit.value.dataLoad(row, tableConfig)
      break;
    case "Delete":
      deleteItem(row)
      break;
    default: break;
  }
}

//点击添加按钮
const clickAdd = () => {
  childAdd.value.dataLoad(null, tableConfig)
}

//删除按钮
const deleteItem = (row: any) => {

  ElMessageBox.confirm('确定删除？')
    .then(() => {
      httpRequest.delete(tableConfig.delUrl, { id: row.id }).then(function (response) {
        if (response.data.isSuccess) {
          ElMessage({
            message: "删除成功！",
            type: 'success',
          })


          GetData()


        } else {
          ElMessage({
            message: "保删除失败！原因：" + response.data.error,
            type: 'error',
          })
        }
      })

    })
}

//查询
let searchBody = {}
const clickSearch = function (body: object) {
  searchBody = body
  GetData()
}

//分页
const changePage = function () {
  GetData()
}

//排序
const orderby = ref({ prop: "createDate", order: "desc" })
const sortChange = (data: { column: any, prop: string, order: any }) => {
  orderby.value = { prop: data.prop, order: data.order }
  GetData()

}

//编辑回调
const editCallBack = () => {

  GetData()

}

//获取数据
const GetData = () => {

  httpRequest.get(tableConfig.getUrl, {
    currentPage: childPagination.value.pagination.currentPage,
    pageSize: childPagination.value.pagination.pageSize,
    orderProp: orderby.value.prop,
    orderby: orderby.value.order,
    searchBody: JSON.stringify(searchBody),
  }).then(function (response) {
    if (response.data.isSuccess) {

      const data = response.data.data.data
      const total = response.data.data.total

      const resultData = GetRecursionMenuList("", data)

      tableData.value = resultData
      childPagination.value.dataLoad(total)

      ElMessage({
        message: "刷新列表",
        type: 'success',
      })
    }
  })
}

onMounted(() => {
  childSearch.value.dataLoad(tableConfig)
  GetData()
})

</script>
<style scoped></style>