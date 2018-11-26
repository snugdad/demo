import { SortDescriptor, CompositeFilterDescriptor } from "@progress/kendo-data-query";
import { User } from '../types'
import HttpClient from '../client'



const client = new HttpClient({baseURL: 'http://localhost:5000'});
client.createEntity({name: 'users'});

export interface SyncData {
    type: 'users/SYNC_DATA',
    payload: User[],
}

export interface  ChangeUser {
    type: 'users/CHANGE_ITEM',
    payload: any,
}

export interface EditIdChange {
    type: 'users/CHANGE_EDIT_ID',
    payload: string,
}
    
export interface SortChange {
    type: 'users/CHANGE_SORT',
    payload: SortDescriptor[],
}

export interface ChangeFilter {
    type: 'users/CHANGE_FILTER',
    payload: CompositeFilterDescriptor,
}

export interface GetAllUsers {
    type: 'users/GET_ALL',
    payload: Promise<User[]>,
}

export interface CreateUser {
    type: 'users/CREATE',
    payload: any
}
export interface UpdateUser {
    type: 'users/UPDATE',
    payload: Promise<User>,
}
export interface EnterCreateMode {
    type: 'users/ENTER_CREATE_MODE',
}

export interface SoftDeleteUser {
    type: 'users/SOFT_DELETE',
    payload: Promise<User>,
}

export interface CancelChanges {
    type: 'users/CANCEL_CHANGES',
    payload: User[],
}

export interface MarkCollectionUpdated {
    type: 'users/MARK_COLLECTION_UPDATED'
}

export interface CloseAlertDialog {
    type: 'CLOSE_ALERT_DIALOG'
}

export interface TogglePasswordColumn {
    type: 'users/TOGGLE_PASSWORD_COLUMN'
}

export interface ToggleDeleteConfirmation {
    type: 'users/TOGGLE_DELETE_CONFIRMATION'
}

/* Action Creators */

export const getAllUsers = (): GetAllUsers => ({
    type: 'users/GET_ALL',
    payload: client.endpoints.users.getAll(),
});

export const createUser = (newUser: User): CreateUser => ({
    type: 'users/CREATE',
    payload: client.endpoints.users.create({...newUser, id: ""}),
});

export const updateUser = (toUpdate: Partial<Pick<User, 'id'>>) => ({
    type: 'users/UPDATE',
    payload: client.endpoints.users.update(toUpdate)
});

export const softDeleteUser = (toDelete: User): SoftDeleteUser => ({
    type: 'users/SOFT_DELETE',
    payload: client.endpoints.users.update(toDelete),
})

export const changeSort = (sort: SortDescriptor[]): SortChange => ({
    type: 'users/CHANGE_SORT',
    payload: sort
});

export const selectRow = (itemID: string): EditIdChange => ({
    type: 'users/CHANGE_EDIT_ID',
    payload: itemID,
});

export const changeItem = (id: string, field: any, value: any): ChangeUser => ({
    type: 'users/CHANGE_ITEM',
    payload: {id, field, value}
});

export const changeFilter = (filter: CompositeFilterDescriptor): ChangeFilter => ({
    type: 'users/CHANGE_FILTER',
    payload: filter,
})

export const syncData = (data: User[]): SyncData => ({
    type: 'users/SYNC_DATA',
    payload: data,
})

export const enterCreateMode = (): EnterCreateMode => ({
    type: 'users/ENTER_CREATE_MODE',
})

export const cancelChanges = (rollbackData: User[]): CancelChanges => ({
    type: 'users/CANCEL_CHANGES',
    payload: rollbackData,
})

export const closeAlertDialog = (): CloseAlertDialog => ({
    type: 'CLOSE_ALERT_DIALOG',
})

export const togglePasswordColumn = (): TogglePasswordColumn => ({
    type: 'users/TOGGLE_PASSWORD_COLUMN'
})

export const toggleDeleteConfirmation = (): ToggleDeleteConfirmation => ({
    type: 'users/TOGGLE_DELETE_CONFIRMATION',
})

export type Action = 
    GetAllUsers | CreateUser | UpdateUser |
    SortChange | EditIdChange | ChangeUser | ChangeFilter
 