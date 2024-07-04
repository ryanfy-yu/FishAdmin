const columns = [
    { prop: "id", hidden: true, label: "ID", editable: false, index: 1, queryable: false, formField: "input", defaultValue: "" },
    { prop: "nodeName", hidden: false, label: "节点名字", editable: true, sortable: true, index: 2, queryable: true, formField: "input", defaultValue: "" },
    { prop: "nodeType", hidden: false, label: "节点类型", editable: true, sortable: true, index: 3, queryable: true, formField: "input", defaultValue: "" },
    { prop: "description", hidden: false, label: "详细", editable: true, sortable: true, index: 3, queryable: true, formField: "input", defaultValue: "" },
    { prop: "status", hidden: false, label: "状态", editable: true, sortable: true, index: 3, queryable: true, formField: "input", defaultValue: "" },

]

const formRoles = {

    nodeName: [{ required: true, message: "节点名必填", trigger: 'blur' }],
    nodeType: [{ required: true, message: "节点类型必填", trigger: 'blur' }],
    status: [{ required: true, message: "状态必填", trigger: 'blur' }],

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