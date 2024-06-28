const columns = [
    { prop: "id", hidden: true, label: "ID", editable: false, index: 1, queryable: false, formField: "input", required: false },

    { prop: "roleName", hidden: false, label: "角色名", editable: true, sortable: true, index: 2, queryable: true, formField: "input", required: true },
    { prop: "status", hidden: false, label: "状态", editable: true, sortable: true, index: 3, queryable: true, formField: "select", selectOrigin: "normal_status", required: true },

    { prop: "createDate", hidden: false, label: "创建时间", editable: false, sortable: true, index: 9, queryable: false, formField: "datetime", required: false },
    { prop: "updateDate", hidden: false, label: "最近更新时间", editable: false, sortable: true, index: 10, queryable: false, formField: "datetime", required: false }
]

const tableConfig = {
    columns: columns,
    Selection: true,
    Operations: true,
    getUrl: "http://localhost:5198/DataTable?moduleid=367db5cb-34d9-11ef-825b-0242ac160003",
    postUrl: "http://localhost:5198/SystemRole",
    putUrl: "http://localhost:5198/SystemRole",
    delUrl: "http://localhost:5198/SystemRole",

}


export { tableConfig }