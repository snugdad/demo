

export default (state={}, action) => {
    switch (action.type) {
        case 'FETCH_USERS_PENDING':
            return { ...state, fetching: true }
        case 'FETCH_USERS_FULFILLED':
            return { 
                ...state, 
                fetching: false, 
                fetched: true,
                data: action.payload.data
            }
        case 'FETCH_USERS_REJECTED':
            return { 
                ...state, 
                fetching: false, 
                error: action.payload 
            }
        default:
            return state
    }
}
