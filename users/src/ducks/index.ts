import { SortDescriptor, CompositeFilterDescriptor } from "@progress/kendo-data-query";
import { User } from '../types'
import { newUserTemplate } from '../types'
import { errors } from "@telerik/kendo-intl";
export type GridState = {
    ui: {
        showPasswordModal: boolean,
        showDeleteConfirmation: boolean,
    }
    error: {
        alertOpen: boolean,
        errors: any,
    }
    validation: {
        toValidate: string | null,
        schema: any,
    }
    collection: {
        fetching: boolean,
        fetched: boolean,
        updated: boolean,
        errors: Error[],
        data: any [],
    }
    editor: {
        editIndex: number,
        inEdit: string | null,
        userInEdit: User | null,
        editLocked: boolean,
        data: any[],
    }
    filter: CompositeFilterDescriptor,
    sort: SortDescriptor [],
}

const initialState: GridState = {
    ui : {
        showPasswordModal: false,
        showDeleteConfirmation: false,
    },
    error : {
        alertOpen: false,
        errors: []
    },
    validation: {
        toValidate: null,
        schema: {},
    },
    collection: {
        fetching: false,
        fetched: false,
        updated: false,
        errors: [],
        data: [],
    },
    editor: {
        editIndex: -1,
        inEdit: null,
        userInEdit: null,
        editLocked: false,
        data: [],
    },
    filter: {
        logic: "or",
        filters: [{ 
            field: "isActive", 
            operator: "eq", 
            value: true, 
        }]
    },
    sort: [],
}

const ui = (state: any = initialState.ui, action: any ) => {
    switch(action.type) {
        case 'users/TOGGLE_PASSWORD_MODAL':
            return { ...state, showPasswordModal: !state.showPasswordModal }
        case 'users/TOGGLE_DELETE_CONFIRMATION':
            return { ...state, showDeleteConfirmation: !state.showDeleteConfirmation }
        default:
            return state;
    }
}

const error = (state: any=initialState.error, action: any) => {
    switch(action.type) {
        case 'DISPLAY_ERROR':
            return {
                alertOpen: true,
                errors: [...state.errors, action.payload]
            }
        case 'CLOSE_ALERT_DIALOG':
            return {
                ...state,
                alertOpen: false,
            }
        default:
            return state;
    }
}

const filter = (state: any =initialState.filter, action: any) => {
    switch(action.type){
        case 'users/CHANGE_FILTER':
            return action.payload;
        default:
            return state;
    }
}

const editor = (state: any =initialState.editor, action: any) => {
    switch(action.type) {
        case 'users/CHANGE_EDIT_ID':
            return (!state.editLocked && !state.inEdit) ? {
                ...state, 
                inEdit: action.payload,
                editLocked: true,
                userInEdit: state.data.filter((u: User) => u.id === action.payload),
                editIndex: state.data.findIndex((u: any) => u.id === action.payload)
            } : state;
        case 'users/CHANGE_ITEM':
            const { id, field, value } = action.payload
            return {
                ...state,
                data: state.data.map((u: User) => {
                    return u.id === id ? { ...u, [field]: value } : u;
                }),
            }
        case 'users/CANCEL_CHANGES':
            return {
                ...state,
                inEdit: null,
                editLocked: false,
                data: action.payload
            }
        case 'users/SYNC_DATA':
            return {
                ...state, 
                inEdit: null,
                editLocked: false,
                editIndex: -1,
                data: action.payload,
            };
        case 'users/ENTER_CREATE_MODE':
            const newData = [...state.data];
            newData.unshift(newUserTemplate);
            return {
                ...state,
                data: newData,
                inEdit: "temp",
                editIndex: 0,
                editLocked: true
            }
        default:
            return state;
    }
}

const sort = (state: any =initialState.sort, action: any) => {
    switch(action.type) {
        case 'users/CHANGE_SORT':
            return action.payload
        default:
            return state;
    }
}


const collection = (state: any = initialState.collection, action: any) => {
    switch(action.type) {
        case 'users/UPDATE_FULFILLED':
            return {
                    ...state,
                    data: state.data.map((u: User) => {
                        return u.id === action.payload.data.id ? {
                             ...action.payload.data 
                            } : u
                    })
                }
        case 'users/SOFT_DELETE_FULFILLED':
            return {
                ...state,
                data: state.data.map((u: User) => {
                    return u.id === action.payload.data.id ? {
                        ...action.payload.data
                    } : u
                })
            }
        case 'users/CREATE_FULFILLED':
                const newData = [...state.data];
                newData.unshift(action.payload.data);
            return {
                ...state,
                data: newData,
            }
        case 'users/GET_ALL':
            return {...state, fetching: true }
        case 'users/GET_ALL_FULFILLED':
            return {
                ...state, 
                fetching: false, 
                fetched: true,
                data: action.payload.data,
            }
        case 'users/GET_ALL_REJECTED':
            return {
                ...state, 
                fetching: false, 
                errors: [...state.errors, action.payload] 
        }
        default:
            return state;
    }
}

export {
   ui, error, editor, sort, collection, filter
}
