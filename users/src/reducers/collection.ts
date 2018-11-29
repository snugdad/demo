import { User } from '../types';

const initialState = {
    fetching: false,
    fetched: false,
    updated: false,
    errors: [],
    data: [],
}

export default (state: any = initialState, action: any) => {
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