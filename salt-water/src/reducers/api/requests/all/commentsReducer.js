

const validation = (state={}, action) => {
    const { id } = action.meta
    console.table(id, action, state)
    switch (action.type) {
        case 'FETCH_COMMENT_PENDING':
            return { ...state, fetching: id }
        case 'FETCH_COMMENT_FULFILLED':
            return { 
                ...state, 
                fetching: null, 
                validEntries: {
                    ...state.validEntries,
                   id: action.payload.data
                }
            }
        case 'FETCH_COMMENT_REJECTED':
            return { 
                ...state, 
                fetching: null, 
                invalidEntries: {
                    ...state.invalidEntries,
                    id: action.payload
                }
            }
    }
}


const collection = (state={}, action) => {
    switch (action.type) {
        case 'FETCH_COMMENTS_PENDING':
            return { ...state, fetching: true }
        case 'FETCH_COMMENTS_FULFILLED':
            return { 
                ...state, 
                fetching: false, 
                fetched: true,
                data: action.payload.data
            }
        case 'FETCH_COMMENTS_REJECTED':
            return { 
                ...state, 
                fetching: false, 
                error: action.payload 
            }
        default:
            return state
    }
}

const intention = meta => {
    console.log(meta)
    if (meta.hasOwnProperty('id')){
        console.log('validation')
        return 'VALIDATION'
    }
    else
        return 'COLLECTION'
}

export default (state={}, action) => {
    switch(intention(action.meta)) {
        case 'VALIDATION':
            console.log('called')
            return {
                ...state,
                validation: validation(state.validation, action),
            }
        case 'COLLECTION':
            return { 
                ...state, 
                collection: collection(state.collection, action), 
            }
        default:
            return state
    }
}