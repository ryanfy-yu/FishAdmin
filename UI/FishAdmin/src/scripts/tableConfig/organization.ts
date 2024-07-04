const columns = [
    { prop: "id", hidden: true, label: "ID", editable: false, index: 1, queryable: false, formField: "input", defaultValue: "" },
    
    { prop: "parentId", dataType: "string", hidden: true, label: "上级组织", editable: true, sortable: true, index: 23, queryable: true, formField: "OrganizationNodeSelector", defaultValue: "" },

    { prop: "nodeName", hidden: false, label: "组织名字", editable: true, sortable: true, index: 2, queryable: true, formField: "input", defaultValue: "" },
    { prop: "nodeType", hidden: false, label: "组织类型", editable: true, sortable: true, index: 3, queryable: true, formField: "input", defaultValue: "" },
    { prop: "description", hidden: false, label: "详细", editable: true, sortable: true, index: 3, queryable: true, formField: "input", defaultValue: "" },
    { prop: "status", hidden: false, label: "状态", editable: true, sortable: true, index: 3, queryable: true, formField: "input", defaultValue: "" },

]

const formRoles = {

    nodeName: [{ required: true, message: "组织名必填", trigger: 'blur' }],
    nodeType: [{ required: true, message: "组织类型必填", trigger: 'blur' }],
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