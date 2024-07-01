const columns = [
    { prop: "id", hidden: true, label: "ID", editable: false, index: 1, queryable: false, formField: "input", defaultValue: "" },
    { prop: "groupName", hidden: false, label: "分组", editable: true, sortable: true, index: 2, queryable: true, formField: "input", defaultValue: "" },
    { prop: "key", hidden: false, label: "键", editable: true, sortable: true, index: 3, queryable: true, formField: "input", defaultValue: "" },
    { prop: "name", hidden: false, label: "名字", editable: true, sortable: true, index: 3, queryable: true, formField: "input", defaultValue: "" },
    { prop: "label", hidden: false, label: "标签", editable: true, sortable: true, index: 3, queryable: true, formField: "input", defaultValue: "" },
    { prop: "value", hidden: false, label: "值", editable: true, sortable: true, index: 4, queryable: true, formField: "input", defaultValue: "" },
    { prop: "description", hidden: false, label: "描述", editable: true, sortable: true, index: 5, queryable: false, formField: "input", defaultValue: "" },

]

const formRoles = {

    groupName: [{ required: true, message: "分组必填", trigger: 'blur' }],
    value: [{ required: true, message: "值必填", trigger: 'blur' }],

}

const tableConfig = {
    columns: columns,
    formRoles: formRoles,
    Selection: true,
    Operations: true,
    getUrl: "/DataTable?moduleid=d102952334c711ef825b0242ac160003",
    postUrl: "/Dictionaries",
    putUrl: "/Dictionaries",
    delUrl: "/Dictionaries",

}

export { tableConfig }