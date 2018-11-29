const initialState = {
    showPasswordModal: false,
    showDeleteConfirmation: false,
}

export default (state: any = initialState, action: any ) => {
    switch(action.type) {
        case 'users/CHANGE_USER_DATA':
            return { ...state, showPasswordModal: false }
        case 'users/TOGGLE_PASSWORD_MODAL':
            return { ...state, showPasswordModal: !state.showPasswordModal }
        case 'users/TOGGLE_DELETE_CONFIRMATION':
            return { ...state, showDeleteConfirmation: !state.showDeleteConfirmation }
        default:
            return state;
    }
}