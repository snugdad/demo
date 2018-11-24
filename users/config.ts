export default {
    "grid": {
        "uiProps": {
            "editField": "inEdit",
            "sortable": true,
            "reorderable": true,
            "sort": [{"field": "username", "dir": "asc"}]
        },
        "behaviorProps": {
            "onRowClick": "UserManagementActions.selectRow",
            "onSortChange": "UserManagementActions.changeSort",
            "onItemChange": "UserManagementActions.changeItem"
        }
    }
}