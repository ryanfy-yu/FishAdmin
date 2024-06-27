const columns = [
    { prop: "id", label: "ID", editable: false, index: 1, queryable: false, formField: "input", required: false },

    { prop: "roleName", label: "角色名", editable: true, sortable: true, index: 2, queryable: true, formField: "input", required: true },
    { prop: "status", label: "状态", editable: true, sortable: true, index: 3, queryable: true, formField: "input", required: true },

    { prop: "createDate", label: "创建时间", editable: false, sortable: true, index: 9, queryable: false, formField: "input", required: false },
    { prop: "updateDate", label: "最近更新时间", editable: false, sortable: true, index: 10, queryable: false, formField: "input", required: false }
]

const tableConfig = {
    columns: columns,
    Selection: true,
    Operations: true,
    getUrl: "http://localhost:5198/SystemRole",
    postUrl: "http://localhost:5198/SystemRole",
    putUrl: "http://localhost:5198/SystemRole",
    delUrl: "http://localhost:5198/SystemRole",

}


export { tableConfig }