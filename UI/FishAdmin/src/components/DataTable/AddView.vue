<template>
    <el-drawer v-model="isShow" size="50%" title="编辑" direction="ltr" :before-close="handleClose">
        <el-form label-width="auto" :model="formData" ref="refForm" :rules="_tableConfig.formRoles">
            <template v-for="(value, key) in formData" :item="GetAttr(key)">
                <template v-if="GetAttr(key).editable || !GetAttr(key).hidden">

                    <el-form-item v-if="GetAttr(key).formField == 'number'" :label="GetAttr(key).label"
                        :prop="GetAttr(key).prop">
                        <el-input type="number" v-model="formData[key]" :disabled="!GetAttr(key).editable" />
                    </el-form-item>

                    <el-form-item v-else-if="GetAttr(key).formField == 'MenuNodeSelector'" :label="GetAttr(key).label"
                        :prop="GetAttr(key).prop">
                        <MenuNodeSelector v-model="formData[key]"></MenuNodeSelector>
                    </el-form-item>

                    <el-form-item v-else-if="GetAttr(key).formField == 'OrganizationNodeSelector'" :label="GetAttr(key).label"
                        :prop="GetAttr(key).prop">
                        <OrganizationNodeSelector v-model="formData[key]"></OrganizationNodeSelector>
                    </el-form-item>

                    <el-form-item v-else-if="GetAttr(key).formField == 'MenuTypeRadio'" :label="GetAttr(key).label"
                        :prop="GetAttr(key).prop">
                        <MenuTypeRadio v-model="formData[key]"></MenuTypeRadio>
                    </el-form-item>

                    <el-form-item v-else-if="GetAttr(key).formField == 'switch'" :label="GetAttr(key).label"
                        :prop="GetAttr(key).prop">
                        <el-switch v-model="formData[key]" :disabled="!GetAttr(key).editable" />
                    </el-form-item>

                    <el-form-item v-else :label="GetAttr(key).label" :prop="GetAttr(key).prop">
                        <el-input v-model="formData[key]" :disabled="!GetAttr(key).editable" />
                    </el-form-item>

                </template>
            </template>
            <el-form-item>
                <el-button @click="resetForm(refForm)">重置</el-button>
                <el-button type="primary" @click="submitForm(refForm)">确定</el-button>
            </el-form-item>
        </el-form>
    </el-drawer>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { ElDrawer, ElMessageBox, ElMessage } from "element-plus";
// import { useSelectionStore } from '@/stores/selection'
import httpRequest from "@/scripts/httpRequest";

import MenuNodeSelector from "@/components/System/MenuNodeSelector.vue";
import OrganizationNodeSelector from "@/components/System/OrganizationNodeSelector.vue";
import MenuTypeRadio from "@/components/System/MenuTypeRadio.vue";


const formData = ref({});
const isShow = ref(false);

let _rowData: any = {};
let _tableConfig: any = {};

const GetAttr = (keyName: string) => {
    return _tableConfig.columns.find((o) => o.prop == keyName);
};

const dataLoad = function (rowData: any, tableConfig: any) {
    _rowData = rowData;

    _tableConfig = tableConfig;

    isShow.value = true;
    let obj: any = {};

    //排序
    const columns = tableConfig.columns.sort((a, b) => a.index - b.index)
    columns.forEach((column) => {

        if (rowData) {
            for (const key in rowData) {
                if (column.prop == key) {

                    if (column.dataType == "Array") {
                        obj[key] = rowData[key] ? JSON.parse(rowData[key]) : "";
                    } else {
                        obj[key] = rowData[key] ? rowData[key].toString() : "";
                    }
                }
            }
        } else {
            obj[column.prop] = column.defaultValue
        }
    });

    formData.value = obj
};

const handleClose = (done: Function) => {
    done();
};

const saveData = () => {

    httpRequest.post(_tableConfig.postUrl, formData.value).then(function (response) {
        if (response.data.isSuccess) {
            ElMessage({
                message: "保存成功！",
                type: "success",
                grouping: true,
            });
            setTimeout(() => {
                emits("callback");
            }, 3000);
        } else {
            ElMessage({
                message: "保持失败！消息：" + response.data.error,
                type: "error",
                grouping: true,
            });
        }
    });
};

const refForm = ref<FormInstance>();
const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate((valid, fields) => {
        if (valid) {
            ElMessageBox.confirm(`确定提交修改？`).then(() => {

                saveData();
            });
        } else {
            console.log("error submit!", fields);
        }
    });
};

const resetForm = (formEl: FormInstance | undefined) => {
    ElMessageBox.confirm(`确定重置？`).then(() => {
        formEl.resetFields();
        dataLoad(_rowData, _tableConfig);
    });
};

const emits = defineEmits(["callback"]);

defineExpose({ dataLoad });
</script>
