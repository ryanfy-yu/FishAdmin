const columns = [

    { prop: "id", dataType: "string", hidden: true, label: "ID", editable: false, index: 0, queryable: false, formField: "input", defaultValue: "" },

    { prop: "parentId", dataType: "string", hidden: true, label: "上级菜单", editable: true, sortable: true, index: 23, queryable: true, formField: "MenuNodeSelector", defaultValue: "" },



    { prop: "menuName", dataType: "string", hidden: false, label: "菜单名称", editable: true, sortable: true, index: 20, queryable: true, formField: "input", defaultValue: "" },
    { prop: "menuCode", dataType: "string", hidden: false, label: "菜单编码", editable: true, sortable: true, index: 25, queryable: true, formField: "input", defaultValue: "" },

    { prop: "menuType", dataType: "string", hidden: false, label: "菜单类型", editable: true, sortable: true, index: 40, queryable: true, formField: "MenuTypeRadio", defaultValue: "" },
    { prop: "index", dataType: "number", hidden: false, label: "菜单索引", editable: true, sortable: true, index: 23, queryable: true, formField: "number", defaultValue: "" },
    { prop: "closable", dataType: "bool", hidden: false, label: "可关闭", editable: true, sortable: true, index: 23, queryable: true, formField: "switch", defaultValue: "true" },
    { prop: "icon", dataType: "string", hidden: false, label: "图标", editable: true, sortable: true, index: 50, queryable: false, formField: "input", defaultValue: "Document" },
    { prop: "viewUrl", dataType: "string", hidden: false, label: "视图路径", editable: true, sortable: true, index: 60, queryable: true, formField: "input", defaultValue: "" },
    { prop: "url", dataType: "string", hidden: false, label: "url路径", editable: true, sortable: true, index: 60, queryable: true, formField: "input", defaultValue: "" },
    { prop: "sort", dataType: "number", hidden: false, label: "排序", editable: true, sortable: true, index: 70, queryable: false, formField: "number", defaultValue: "100" },
    { prop: "status", dataType: "string", hidden: false, label: "状态", editable: true, sortable: true, index: 80, queryable: true, formField: "input", selectOrigin: "normal_status", defaultValue: "1" },
    { prop: "createDate", dataType: "string", hidden: true, label: "创建时间", editable: false, sortable: true, index: 90, queryable: true, formField: "datetime", defaultValue: "" },
    { prop: "updateDate", dataType: "string", hidden: true, label: "最近更新时间", editable: false, sortable: true, index: 100, queryable: true, formField: "datetime", defaultValue: "" }
]

const formRoles = {

    menuName: [{ required: true, message: "菜单名称必填", trigger: 'blur' }],
    menuCode: [{ required: true, message: "菜单编码必填", trigger: 'blur' }],
    menuType: [{ required: true, message: "菜单类型必填", trigger: 'blur' }],
    sort: [{ required: true, message: "排序必填", trigger: 'blur' }],
    index: [{ required: true, message: "索引必填", trigger: 'blur' }],
    closable: [{ required: true, message: "可关闭必选", trigger: 'blur' }],
}

const tableConfig = {
    columns: columns.sort((a, b) => a.index - b.index),
    formRoles: formRoles,
    Selection: true,
    Operations: true,
    getUrl: "/DataTable?moduleid=367da91c34d911ef825b0242ac160003",
    postUrl: "/SystemMenu",
    putUrl: "/SystemMenu",
    delUrl: "/SystemMenu",

}

export { tableConfig }