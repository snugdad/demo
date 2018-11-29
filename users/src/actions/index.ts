import { SortDescriptor, CompositeFilterDescriptor } from "@progress/kendo-data-query";
import { User } from '../types'
import HttpClient from '../client'
import * as Types from './types'


const client = new HttpClient({baseURL: 'http://localhost:5000'});
client.createEntity({name: 'users'});

/* Action Creators */
export const cancelChanges = (rollbackData: User[]): Types.CancelChanges => ({
    type: 'users/CANCEL_CHANGES',
    payload: rollbackData,
});

export const changeFilter = (filter: CompositeFilterDescriptor): Types.ChangeFilter => ({
    type: 'users/CHANGE_FILTER',
    payload: filter,
});

export const changeSort = (sort: SortDescriptor[]): Types.ChangeSort => ({
    type: 'users/CHANGE_SORT',
    payload: sort
});

export const changeUserData = (id: string, field: any, value: any): Types.ChangeUserData => ({
    type: 'users/CHANGE_USER_DATA',
    payload: {id, field, value}
});

export const closeAlertDialog = (): Types.CloseAlertDialog => ({
    type: 'CLOSE_ALERT_DIALOG',
});

export const createUser = (newUser: User): Types.CreateUser => ({
    type: 'users/CREATE',
    payload: client.endpoints.users.create({...newUser, id: ""}),
});


export const enterCreateMode = (): Types.EnterCreateMode => ({
    type: 'users/ENTER_CREATE_MODE',
})
export const getAllUsers = (): Types.GetAllUsers => ({
    type: 'users/GET_ALL',
    payload: client.endpoints.users.getAll(),
});

export const updateUser = (toUpdate: Partial<Pick<User, 'id'>>): Types.UpdateUser => ({
    type: 'users/UPDATE',
    payload: client.endpoints.users.update(toUpdate)
});

export const softDeleteUser = (toDelete: User): Types.SoftDeleteUser => ({
    type: 'users/SOFT_DELETE',
    payload: client.endpoints.users.update(toDelete),
})


export const selectRow = (itemID: string): Types.EditIdChange => ({
    type: 'users/CHANGE_EDIT_ID',
    payload: itemID,
});





export const syncData = (data: User[]): Types.SyncData => ({
    type: 'users/SYNC_DATA',
    payload: data.map((u: User)=>{
        return {...u, password: ""}
    }),
})







export const togglePasswordModal = (): Types.TogglePasswordModal => ({
    type: 'users/TOGGLE_PASSWORD_MODAL'
})

export const toggleDeleteConfirmation = (): Types.ToggleDeleteConfirmation => ({
    type: 'users/TOGGLE_DELETE_CONFIRMATION',
})

export const changeUserPassword = (patch: any): Types.ChangeUserDataPassword => ({
    type: 'users/CHANGE_USER_PASSWORD',
    payload: client.endpoints.users.update(patch),
})
