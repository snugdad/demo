import { newUserTemplate, User, EditorState } from '../types'

const initialState: any = {
    editIndex: -1,
    inEdit: null,
    userInEdit: [{id: "null"}],
    inCreateMode: false,
    data: [],
}

export default (state: any = initialState, action: any) => {
    switch(action.type) {
        case 'users/CHANGE_EDIT_ID':
            return (!state.inCreateMode) ? {
                ...state, 
                inEdit: action.payload,
                userInEdit: state.data.filter((u: User) => u.id === action.payload),
                editIndex: state.data.findIndex((u: any) => u.id === action.payload)
            } : state;
        case 'users/CHANGE_USER_DATA':
            const { id, field, value } = action.payload
            return {
                ...state,
                userInEdit: [{ ...state.userInEdit[0], [field]: value }],
                data: state.data.map((u: User) => {
                    return u.id === id ? { ...u, [field]: value } : u;
                }),
            }
        case 'users/CANCEL_CHANGES':
            return {
                ...state,
                inEdit: null,
                inCreateMode: false,
                data: action.payload
            }
        case 'users/SYNC_DATA':
            return {
                ...state, 
                inEdit: null,
                inCreateMode: false,
                editIndex: -1,
                data: action.payload,
            };
        case 'users/CHANGE_USER_PASSWORD':
            return {
                ...state, 
                inCreateMode: false,
                inEdit: null,
                editIndex: -1,
            }
        case 'users/ENTER_CREATE_MODE':
            const newData = [...state.data];
            newData.unshift(newUserTemplate);
            return {
                ...state,
                data: newData,
                inEdit: "temp",
                editIndex: 0,
                userInEdit: [{...newData[0]}],
                inCreateMode: true
            }
        default:
            return state;
    }
}