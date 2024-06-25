<template>
    <el-pagination v-model:current-page="pagination.currentPage" v-model:page-size="pagination.pageSize"
        :page-sizes="[20, 50, 100, 200]" :small="small" :disabled="disabled" :background="background"
        layout="total, sizes, prev, pager, next, jumper" :total="pagination.total" @change="handlePageChange" />
</template>

<script setup>
import { ref } from 'vue'

const handlePageChange = function (item) {

    emits("changePage")
}

const emits = defineEmits(["changePage"])


//const pTotal = 0

const pagination = ref({
    currentPage: 1,
    pageSize: 20,
    total: 0,
})

const dataLoad = (total) => {

    // pagination.value.currentPage = currentPage
    // pagination.value.pageSize = pageSize
    pagination.value.total = total
}

defineExpose({ dataLoad, pagination })
</script>