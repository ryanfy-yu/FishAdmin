const columns = [
    { prop: "id", hidden: true, label: "ID", editable: false, index: 1, queryable: false, formField: "input", defaultValue: "" },

    { prop: "roleName", hidden: false, label: "角色名", editable: true, sortable: true, index: 2, queryable: true, formField: "input", defaultValue: "" },
    { prop: "status", hidden: false, label: "状态", editable: true, sortable: true, index: 3, queryable: true, formField: "input", defaultValue: "1" },

    { prop: "createDate", hidden: false, label: "创建时间", editable: false, sortable: true, index: 9, queryable: false, formField: "datetime", defaultValue: "" },
    { prop: "updateDate", hidden: false, label: "最近更新时间", editable: false, sortable: true, index: 10, queryable: false, formField: "datetime", defaultValue: "" }
]

const formRoles = {

    roleName: [{ required: true, message: "角色名必填", trigger: 'blur' }],
    status: [{ required: true, message: "状态必填", trigger: 'blur' }],

}

const tableConfig = {
    columns: columns,
    formRoles: formRoles,
    Selection: true,
    Operations: true,
    getUrl: "/DataTable?moduleid=367db5cb34d911ef825b0242ac160003",
    postUrl: "/SystemRole",
    putUrl: "/SystemRole",
    delUrl: "/SystemRole",

}


export { tableConfig }