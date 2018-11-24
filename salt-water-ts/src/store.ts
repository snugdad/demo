
/* These are redux action creators */


interface User {
    id: string, 
    firstName: string, 
    lastName: string,
    username: string,
    password: string,
    isEntryAdmin: boolean,
    isListAdmin: boolean,
    isLocationManager: boolean,
    isOperatorAdmin: boolean,
    isUserAdmin: boolean,
}

interface EditIdChangeAction {
    type: 'CHANGE_EDIT_ID',
    payload: string,
}
interface SortChangeAction {
    type: 'CHANGE_SORT',
    payload: Sort,
}

interface  ChangeItemAction<T> {
    type: 'CHANGE_ITEM',
    payload: T,
}

module UserManagementActions {

    export const changeSort = (sort: Sort): SortChangeAction => ({
        type: 'CHANGE_SORT',
        payload: sort
    });

    export const selectRow = (itemID: string): EditIdChangeAction => ({
        type: 'CHANGE_EDIT_ID',
        payload: itemID,
    });

    export const changeItem = (item: User): ChangeItemAction<User> => ({
        type: 'CHANGE_ITEM',
        payload: item,
    });
}
/* This produces the initial state for the component */






const initialState: any = {
    inEdit: null,
    sort: [],
    data: [],
}

/* Reducers */

const selected = (state = initialState.sort, action: SortChange) =>