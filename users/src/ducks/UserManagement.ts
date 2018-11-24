import { SortDescriptor, CompositeFilterDescriptor } from "@progress/kendo-data-query";
import { User } from '../types'
import HttpClient from '../client'



const client = new HttpClient({baseURL: 'http://localhost:5000'});
client.createEntity({name: 'users'});

export interface AssignData {
    type: 'users/ASSIGN_DATA',
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
    payload: any,
}
export interface EnterCreateMode {
    type: 'users/ENTER_CREATE_MODE',
    payload: any
}

export interface SoftDeleteUser {
    type: 'users/SOFT_DELETE',
}

export interface CancelChanges {
    type: 'users/CANCEL_CHANGES',
    payload: User[],
}

/* Action Creators */

export const getAllUsers = (): GetAllUsers => ({
    type: 'users/GET_ALL',
    payload: client.endpoints.users.getAll(),
});

export const createUser = (newUser: User): CreateUser => ({
    type: 'users/CREATE',
    payload: client.endpoints.users.create(newUser),
});

export const updateUser = (toUpdate: Partial<Pick<User, 'id'>>) => ({
    type: 'users/UPDATE',
    payload: client.endpoints.users.update(toUpdate)
});

export const softDeleteUser = (): SoftDeleteUser => ({
    type: 'users/SOFT_DELETE',

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

export const assignData = (data: User[]): AssignData => ({
    type: 'users/ASSIGN_DATA',
    payload: data,
})

export const enterCreateMode = (): EnterCreateMode => ({
    type: 'users/ENTER_CREATE_MODE',
    payload: { editLocked: true, editID: "temp" }
})

export const cancelChanges = (rollbackData: User[]): CancelChanges => ({
    type: 'users/CANCEL_CHANGES',
    payload: rollbackData,
})


export type Action = 
    GetAllUsers | CreateUser | UpdateUser |
    SortChange | EditIdChange | ChangeUser | ChangeFilter
 