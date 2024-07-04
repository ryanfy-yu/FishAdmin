<!-- 菜单级联选择 -->
<template>
   <el-radio-group v-model="cascaderModel" @change="thisChange">
      <el-radio value="1" size="large">节点</el-radio>
      <el-radio value="2" size="large">菜单</el-radio>
      <el-radio value="3" size="large">按钮</el-radio>
    </el-radio-group>

</template>

<script lang="ts" setup>

const cascaderModel = defineModel()

const thisChange = (value: string) => {
  
    emits("change", value)
}


const emits = defineEmits(["change"])

</script>