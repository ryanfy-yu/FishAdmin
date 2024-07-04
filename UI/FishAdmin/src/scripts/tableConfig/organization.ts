const columns = [
    { prop: "id", hidden: true, label: "ID", editable: false, index: 1, queryable: false, formField: "input", defaultValue: "" },
    { prop: "NodeName", hidden: false, label: "节点名字", editable: true, sortable: true, index: 2, queryable: true, formField: "input", defaultValue: "" },
    { prop: "NodeType", hidden: false, label: "节点类型", editable: true, sortable: true, index: 3, queryable: true, formField: "input", defaultValue: "" },
    { prop: "Description", hidden: false, label: "详细", editable: true, sortable: true, index: 3, queryable: true, formField: "input", defaultValue: "" },
    { prop: "Status", hidden: false, label: "标签", editable: true, sortable: true, index: 3, queryable: true, formField: "input", defaultValue: "" },

]

const formRoles = {

    NodeName: [{ required: true, message: "节点名必填", trigger: 'blur' }],
    NodeType: [{ required: true, message: "节点类型必填", trigger: 'blur' }],
    Status: [{ required: true, message: "状态必填", trigger: 'blur' }],

}

const tableConfig = {
    columns: columns,
    formRoles: formRoles,
    Selection: true,
    Operations: true,
    getUrl: "/DataTable?moduleid=0feb0a3137dd11ef870e0242ac160003",
    postUrl: "/Organization",
    putUrl: "/Organization",
    delUrl: "/Organization",
}

export { tableConfig }