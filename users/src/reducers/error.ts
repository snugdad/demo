import { ErrorState } from '../types'

const initialState: ErrorState = {
    alertOpen: false,
    errors: []
}

export default (state: any=initialState, action: any) => {
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