const columns = [
    { prop: "id", hidden: true, label: "ID", editable: false, index: 1, queryable: false, formField: "input", defaultValue: "" },
    { prop: "username", hidden: false, label: "用户名", editable: true, sortable: true, index: 2, queryable: true, formField: "input", defaultValue: "" },
    { prop: "email", hidden: false, label: "邮箱", editable: true, sortable: true, index: 3, queryable: true, formField: "input", defaultValue: "" },
    { prop: "phoneNumber", hidden: false, label: "电话号码", editable: true, sortable: true, index: 4, queryable: true, formField: "input", defaultValue: "" },
    { prop: "password", hidden: false, label: "密码", editable: true, sortable: true, index: 5, queryable: false, formField: "input", defaultValue: "" },
    { prop: "userType", hidden: false, label: "类型", editable: true, sortable: true, index: 6, queryable: true, formField: "select", selectOrigin: "usertype", defaultValue: "" },
    { prop: "imageUrl", hidden: false, label: "imageUrl", editable: true, sortable: true, index: 7, queryable: false, formField: "input", defaultValue: "" },
    { prop: "createDate", hidden: false, label: "创建时间", editable: false, sortable: true, index: 8, queryable: true, formField: "datetime", defaultValue: "" },
    { prop: "updateDate", hidden: true, label: "最近更新时间", editable: false, sortable: true, index: 9, queryable: false, formField: "datetime", defaultValue: "" },
    { prop: "lastLoginTime", hidden: false, label: "最近登录时间", editable: false, sortable: true, index: 10, queryable: true, formField: "datetime", defaultValue: "" },
    { prop: "status", hidden: false, label: "状态", editable: true, sortable: true, index: 11, queryable: true, formField: "select", selectOrigin: "normal_status", defaultValue: "1" },
]


const formRoles = {

    username: [{ required: true, message: "角色名必填", trigger: 'blur' }],
    email: [{ required: true, message: "Email必填", trigger: 'blur' }],
    phoneNumber: [{ required: true, message: "电话号码必填", trigger: 'blur' }],
    password: [{ required: true, message: "密码必填", trigger: 'blur' }],
    status: [{ required: true, message: "状态必填", trigger: 'blur' }],

}

const tableConfig = {
    columns: columns,
    formRoles: formRoles,
    Selection: true,
    Operations: true,
    getUrl: "/DataTable?moduleid=8959af3334d911ef825b0242ac160003",
    postUrl: "/SystemUser",
    putUrl: "/SystemUser",
    delUrl: "/SystemUser",

}

export { tableConfig }