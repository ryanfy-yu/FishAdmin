const columns = [
    { prop: "id", label: "ID", editable: false, index: 1, queryable: false, formField: "input", required: false },
    { prop: "parentId", label: "父節點", editable: true, sortable: true, index: 2, queryable: true, formField: "input", required: true },
    { prop: "menuName", label: "菜單名", editable: true, sortable: true, index: 3, queryable: true, formField: "input", required: true },
    { prop: "menuType", label: "菜單類型", editable: true, sortable: true, index: 4, queryable: true, formField: "input", required: true },
    { prop: "icon", label: "圖標", editable: true, sortable: true, index: 5, queryable: false, formField: "input", required: true },
    { prop: "url", label: "Url", editable: true, sortable: true, index: 6, queryable: true, formField: "input" },
    { prop: "sort", label: "排序", editable: true, sortable: true, index: 7, queryable: false, formField: "input", required: false },
    { prop: "status", label: "狀態", editable: false, sortable: true, index: 8, queryable: false, formField: "input", required: false },
    { prop: "createDate", label: "创建时间", editable: false, sortable: true, index: 9, queryable: false, formField: "input", required: false },
    { prop: "updateDate", label: "最近更新时间", editable: false, sortable: true, index: 10, queryable: false, formField: "input", required: false }
]

const opConfig = {
    Selection: true,
    Operations: true,
    getUrl:"http://localhost:5198/SystemMenu",
    postUrl:"http://localhost:5198/SystemMenu",
    putUrl:"http://localhost:5198/SystemMenu",
    delUrl:"http://localhost:5198/SystemMenu",

}

export { columns, opConfig }