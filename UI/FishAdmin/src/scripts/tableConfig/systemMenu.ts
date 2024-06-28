const columns = [
    { prop: "id", hidden: true, label: "ID", editable: false, index: 0, queryable: false, formField: "input", required: false },
    { prop: "parentId", hidden: true, label: "上级菜单", editable: true, sortable: true, index: 10, queryable: true, formField: "cascader",selectOrigin: "menu", required: true },
    { prop: "menuName", hidden: false, label: "菜单名称", editable: true, sortable: true, index: 20, queryable: true, formField: "input", required: true },
    { prop: "menuType", hidden: false, label: "菜單類型", editable: true, sortable: true, index: 40, queryable: true, formField: "select", selectOrigin: "systemmenu_menutype", required: true },
    { prop: "icon", hidden: false, label: "图标", editable: true, sortable: true, index: 50, queryable: false, formField: "input", required: true },
    { prop: "url", hidden: false, label: "Url", editable: true, sortable: true, index: 60, queryable: true, formField: "input" },
    { prop: "sort", hidden: false, label: "排序", editable: true, sortable: true, index: 70, queryable: false, formField: "number", required: false },
    { prop: "status", hidden: false, label: "状态", editable: true, sortable: true, index: 80, queryable: true, formField: "select", selectOrigin: "normal_status", required: false },
    { prop: "createDate", hidden: false, label: "创建时间", editable: false, sortable: true, index: 90, queryable: true, formField: "datetime", required: false },
    { prop: "updateDate", hidden: false, label: "最近更新时间", editable: false, sortable: true, index: 100, queryable: true, formField: "datetime", required: false }
]

const tableConfig = {
    columns: columns,
    Selection: true,
    Operations: true,
    getUrl: "http://localhost:5198/DataTable?moduleid=367da91c-34d9-11ef-825b-0242ac160003",
    postUrl: "http://localhost:5198/SystemMenu",
    putUrl: "http://localhost:5198/SystemMenu",
    delUrl: "http://localhost:5198/SystemMenu",

}

export { tableConfig }