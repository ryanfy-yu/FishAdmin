<template>
  <div style="padding: 15px;">

    <el-collapse>
      <el-collapse-item>
        <template #title>
          <el-icon class="header-icon">
            <Search />
          </el-icon>
        </template>
        <DataSearch ref="childSearch" @clickSearch="clickSearch"></DataSearch>
      </el-collapse-item>
    </el-collapse>


    <div class="table-button" style="padding: 15px;">
      <TableButtons />
    </div>
    <el-scrollbar style="height: 100%;">
      <el-table :data="tableData" stripe border max-height="500px" @sort-change="sortChange">
        <el-table-column v-if="tableConfig.Selection" type="selection" width="40" />
        <el-table-column v-for="item in tableColumn" :prop="item.prop" :label="item.label" sortable="custom" />

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
  <EditView ref="childEdit"></EditView>
</template>


<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import DataSearch from '@/views/DataTable/SystemUser/DataSearch.vue'
import TableButtons from '@/components/DataTable/TableButtons.vue'
import DetailView from '@/views/DataTable/SystemUser/DetailView.vue'
import EditView from '@/views/DataTable/SystemUser/EditView.vue'
import TablePagination from '@/views/DataTable/SystemUser/PaginationView.vue'
import httpRequest from '@/scripts/httpRequest'

import { columns, opConfig } from "@/scripts/tableConfig/systemUser"

const orderby = ref({ prop: "createDate", order: "desc" })
const tableData = ref([])



//表配置
const tableColumn = columns
const tableConfig = opConfig


//组件实例
const childDetail = ref()
const childEdit = ref()
const childSearch = ref()
const childPagination = ref()

const handleClick = function (opType: string, index: number, row: object) {
  switch (opType) {
    case "Detail":
      childDetail.value.dataLoad(row, tableColumn)
      break;
    case "Edit":
      childEdit.value.dataLoad(row, tableColumn)
      break;
    default: break;
  }
}

let searchList = <Array<any>>[]
const clickSearch = function (list: Array<any>[]) {
  searchList = list
  GetData()
}

const changePage = function () {
  GetData()
}

const sortChange = (data: { column: any, prop: string, order: any }) => {

  orderby.value = { prop: data.prop, order: data.order }
  GetData()

}

const GetData = () => {

  httpRequest.post("http://localhost:5198/SystemUser", {
    currentPage: childPagination.value.pagination.currentPage,
    pageSize: childPagination.value.pagination.pageSize,
    OrderProp: orderby.value.prop,
    Orderby: orderby.value.order,
    searchList: searchList

  }).then(function (response) {
    if (response.data.isSuccess) {
      const data = response.data.data.data
      const total = response.data.data.total

      tableData.value = data
      childPagination.value.dataLoad(total)
    }
  });

}

onMounted(() => {
  childSearch.value.dataLoad(tableColumn)
  GetData()
})

</script>
<style scoped></style>