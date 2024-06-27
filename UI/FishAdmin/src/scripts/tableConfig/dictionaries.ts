const columns = [
    { prop: "id", label: "ID", editable: false, index: 1, queryable: false, formField: "input", required: false },
    { prop: "groupName", label: "分组", editable: true, sortable: true, index: 2, queryable: true, formField: "input", required: true },
    { prop: "key", label: "Key", editable: true, sortable: true, index: 3, queryable: true, formField: "input", required: true },
    { prop: "name", label: "Name", editable: true, sortable: true, index: 3, queryable: true, formField: "input", required: true },
    { prop: "label", label: "Label", editable: true, sortable: true, index: 3, queryable: true, formField: "input", required: true },
    { prop: "value", label: "Value", editable: true, sortable: true, index: 4, queryable: true, formField: "input", required: true },
    { prop: "description", label: "描述", editable: true, sortable: true, index: 5, queryable: false, formField: "input", required: true },

]

const tableConfig = {
    columns: columns,
    Selection: true,
    Operations: true,
    getUrl: "http://localhost:5198/Dictionaries",
    postUrl: "http://localhost:5198/Dictionaries",
    putUrl: "http://localhost:5198/Dictionaries",
    delUrl: "http://localhost:5198/Dictionaries",

}

export { tableConfig }