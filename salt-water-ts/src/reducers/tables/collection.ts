import { getActionStatus } from '../../actions/types'

export default (state:any={}, action: any) => {
    console.log(`called with ${action.type}`)
    switch(getActionStatus(action.type)) {
        case 'PENDING':
            return { ...state, fetching: true }
        case 'FULFILLED':
            return { 
                ...state, 
                fetching: false, 
                fetched: true,
                data: action.payload.data
            }
        case 'REJECTED':
            return { 
                ...state, 
                fetching: false, 
                error: action.payload 
            }
        default:
            return state
    }
}

