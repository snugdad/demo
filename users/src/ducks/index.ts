import { SortDescriptor, CompositeFilterDescriptor } from "@progress/kendo-data-query";
import { User } from '../types'
import { newUserTemplate } from '../types'
export type GridState = {
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
        editLocked: boolean,
        backup: any[],
        data: any[],
    }
    filter: CompositeFilterDescriptor,
    sort: SortDescriptor [],
}

const initialState: GridState = {
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
        editLocked: false,
        backup: [],
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
            return {
                ...state, 
                inEdit: action.payload,
                editLocked: true,
                editIndex: state.data.findIndex((u: any) => u.id === action.payload)
            }
        case 'users/SOFT_DELETE':
            return {
                ...state,
                data: [
                    ...state.data.map((u: User) => {
                        return u.id === state.inEdit ? { ...u, isActive: false } : u
                    })
                ]
            }
        case 'users/UPDATE_FULFILLED':
            return {
                ...state,
                inEdit: null,
                editLocked: false,
                editIndex: -1,
            }
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
        case 'users/ASSIGN_DATA':
            return {...state, data: action.payload};
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
                        return u.id === action.payload.id ? { ...action.payload.data } : u
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
   editor, sort, collection, filter
}
