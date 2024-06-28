const columns = [
    { prop: "id", hidden: true, label: "ID", editable: false, index: 1, queryable: false, formField: "input", required: false },
    { prop: "username", hidden: false, label: "用户名", editable: true, sortable: true, index: 2, queryable: true, formField: "input", required: true },
    { prop: "email", hidden: false, label: "邮箱", editable: true, sortable: true, index: 3, queryable: true, formField: "input", required: true },
    { prop: "phoneNumber", hidden: false, label: "电话号码", editable: true, sortable: true, index: 4, queryable: true, formField: "input", required: true },
    { prop: "password", hidden: false, label: "密码", editable: true, sortable: true, index: 5, queryable: false, formField: "input", required: true },
    { prop: "userType", hidden: false, label: "类型", editable: true, sortable: true, index: 6, queryable: true, formField: "select", selectOrigin: "usertype" },
    { prop: "imageUrl", hidden: false, label: "imageUrl", editable: true, sortable: true, index: 7, queryable: false, formField: "input", required: false },
    { prop: "createDate", hidden: false, label: "创建时间", editable: false, sortable: true, index: 8, queryable: true, formField: "datetime", required: false },
    { prop: "updateDate", hidden: false, label: "最近更新时间", editable: false, sortable: true, index: 9, queryable: true, formField: "datetime", required: false },
    { prop: "lastLoginTime", hidden: false, label: "最近登录时间", editable: false, sortable: true, index: 10, queryable: true, formField: "datetime", required: false },
    { prop: "status", hidden: false, label: "状态", editable: true, sortable: true, index: 11, queryable: true, formField: "select", selectOrigin: "normal_status", required: false },
]

const tableConfig = {
    columns: columns,
    Selection: true,
    Operations: true,
    getUrl: "http://localhost:5198/DataTable?moduleid=8959af33-34d9-11ef-825b-0242ac160003",
    postUrl: "http://localhost:5198/SystemUser",
    putUrl: "http://localhost:5198/SystemUser",
    delUrl: "http://localhost:5198/SystemUser",

}

export { tableConfig }