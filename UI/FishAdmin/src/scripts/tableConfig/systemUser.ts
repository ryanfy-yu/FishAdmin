const columns = [
    { prop: "id", label: "ID", editable: false, index: 1, queryable: false, formField: "input", required: false },
    { prop: "username", label: "用户名", editable: true, sortable: true, index: 2, queryable: true, formField: "input", required: true },
    { prop: "email", label: "邮箱", editable: true, sortable: true, index: 3, queryable: true, formField: "input", required: true },
    { prop: "phoneNumber", label: "电话号码", editable: true, sortable: true, index: 4, queryable: true, formField: "input", required: true },
    { prop: "password", label: "密码", editable: true, sortable: true, index: 5, queryable: false, formField: "input", required: true },
    { prop: "userType", label: "类型", editable: true, sortable: true, index: 6, queryable: true, formField: "input" },
    { prop: "imageUrl", label: "imageUrl", editable: true, sortable: true, index: 7, queryable: false, formField: "input", required: false },
    { prop: "createDate", label: "创建时间", editable: false, sortable: true, index: 8, queryable: false, formField: "input", required: false },
    { prop: "updateDate", label: "最近更新时间", editable: false, sortable: true, index: 9, queryable: false, formField: "input", required: false },
    { prop: "lastLoginTime", label: "最近登录时间", editable: false, sortable: true, index: 10, queryable: false, formField: "input", required: false },
    { prop: "status", label: "状态", editable: true, sortable: true, index: 11, queryable: true, formField: "input", required: false },
    { prop: "isDeleted", label: "是否删除", editable: true, sortable: false, index: 12, queryable: false, formField: "input", required: false }
]

const opConfig = {
    Selection: true,
    Operations: true,
    getUrl:"http://localhost:5198/SystemUser",
    addUrl:"http://localhost:5198/SystemUser",
    editUrl:"http://localhost:5198/SystemUser",
    delUrl:"http://localhost:5198/SystemUser"
}

export { columns, opConfig }