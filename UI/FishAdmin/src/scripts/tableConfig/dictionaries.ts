import { isHidden } from "element-plus/es/components/focus-trap/index.mjs"

const columns = [
    { prop: "id", hidden: true, label: "ID", editable: false, index: 1, queryable: false, formField: "input", required: false },
    { prop: "groupName", hidden: false, label: "分组", editable: true, sortable: true, index: 2, queryable: true, formField: "input", required: true },
    { prop: "key", hidden: false, label: "Key", editable: true, sortable: true, index: 3, queryable: true, formField: "input", required: true },
    { prop: "name", hidden: false, label: "Name", editable: true, sortable: true, index: 3, queryable: true, formField: "input", required: true },
    { prop: "label", hidden: false, label: "Label", editable: true, sortable: true, index: 3, queryable: true, formField: "input", required: true },
    { prop: "value", hidden: false, label: "Value", editable: true, sortable: true, index: 4, queryable: true, formField: "input", required: true },
    { prop: "description", hidden: false, label: "描述", editable: true, sortable: true, index: 5, queryable: false, formField: "input", required: true },

]

const tableConfig = {
    columns: columns,
    Selection: true,
    Operations: true,
    getUrl: "http://localhost:5198/DataTable?moduleid=d1029523-34c7-11ef-825b-0242ac160003",
    postUrl: "http://localhost:5198/Dictionaries",
    putUrl: "http://localhost:5198/Dictionaries",
    delUrl: "http://localhost:5198/Dictionaries",

}

export { tableConfig }