import { SortDescriptor, CompositeFilterDescriptor } from "@progress/kendo-data-query";
export type GridState = {

    collection: {

        fetching: boolean,
        fetched: boolean,
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

    collection: {

        fetching: false,
        fetched: false,
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
    sort: [{field: 'username', dir: 'asc'}],
}

const filter = (state: any =initialState.filter, action: any) => {
    switch(action.type){
        case 'users/CHANGE_FILTER':
            return action.payload;
        default:
            return state;
    }
}

// const root = (state: any =initialState, action: any) => {
//     switch(action.type) {
        
// }

const editor = (state: any =initialState.editor, action: any) => {
    switch(action.type) {
        case 'users/CHANGE_EDIT_ID':
            return {
                ...state, 
                inEdit: action.payload, 
                editIndex: state.data.findIndex((u: any) => u.id === action.payload)
            }
    case 'users/CHANGE_ITEM':
        const { field, value } = action.payload
        const index = state.editIndex
        let change = [...state.data]
        change[index] = {...change[index], [field]: value}
        console.log(action.payload.id, change[index].id)
        return {
            ...state,
            data: [...change],
        }

        case 'users/ASSIGN_DATA':
            return {...state, data: action.payload};
        case 'users/ENTER_CREATE_MODE':
            const newData = [...state.data];
            newData.unshift({id: "temp"});
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
        case: 'users/CHANGE_EDIT_ID'

        case 'users/GET_ALL_PENDING':
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
