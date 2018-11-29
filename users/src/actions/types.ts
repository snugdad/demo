import { SortDescriptor, CompositeFilterDescriptor } from '@progress/kendo-data-query'
import { User } from '../types'

export interface CancelChanges {
    type: 'users/CANCEL_CHANGES',
    payload: User[],
}

export interface ChangeFilter {
    type: 'users/CHANGE_FILTER',
    payload: CompositeFilterDescriptor,
}

export interface ChangeSort {
    type: 'users/CHANGE_SORT',
    payload: SortDescriptor[],
}

export interface  ChangeUserData {
    type: 'users/CHANGE_USER_DATA',
    payload: any,
}
export interface CloseAlertDialog {
    type: 'CLOSE_ALERT_DIALOG'
}

export interface CreateUser {
    type: 'users/CREATE',
    payload: any
}

export interface EditIdChange {
    type: 'users/CHANGE_EDIT_ID',
    payload: string,
}
export interface EnterCreateMode {
    type: 'users/ENTER_CREATE_MODE',
}

export interface GetAllUsers {
    type: 'users/GET_ALL',
    payload: Promise<User[]>,
}

export interface SyncData {
    type: 'users/SYNC_DATA',
    payload: User[],
}

export interface SoftDeleteUser {
    type: 'users/SOFT_DELETE',
    payload: Promise<User>,
}

export interface TogglePasswordModal {
    type: 'users/TOGGLE_PASSWORD_MODAL'
}

export interface ToggleDeleteConfirmation {
    type: 'users/TOGGLE_DELETE_CONFIRMATION'
}

export interface ChangeUserDataPassword {
    type: 'users/CHANGE_USER_PASSWORD',
    payload: any,
}

export interface UpdateUser {
    type: 'users/UPDATE',
    payload: Promise<User>,
}
