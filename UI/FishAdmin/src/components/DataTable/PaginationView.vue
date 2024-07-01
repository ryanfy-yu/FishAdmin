<template>
    <el-pagination v-model:current-page="pagination.currentPage" v-model:page-size="pagination.pageSize"
        :page-sizes="[15, 30, 50, 100]" layout="total, sizes, prev, pager, next, jumper" :total="pagination.total"
        @change="handlePageChange" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const handlePageChange = function (item) {

    emits("changePage")
}

const emits = defineEmits(["changePage"])

const pagination = ref({
    currentPage: 1,
    pageSize: 15,
    total: 0,
})

const dataLoad = (total) => {

    pagination.value.total = total
}

defineExpose({ dataLoad, pagination })
</script>