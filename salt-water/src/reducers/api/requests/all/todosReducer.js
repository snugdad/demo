

const validation = (state={}, action) => {
    const { id } = action.meta
    console.table(id, action, state)
    switch (action.type) {
        case 'FETCH_TODO_PENDING':
            return { ...state, fetching: id }
        case 'FETCH_TODO_FULFILLED':
            return { 
                ...state, 
                fetching: null, 
                validEntries: {
                    ...state.validEntries,
                   id: action.payload.data
                }
            }
        case 'FETCH_TODO_REJECTED':
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
        case 'FETCH_TODOS_PENDING':
            return { ...state, fetching: true }
        case 'FETCH_TODOS_FULFILLED':
            return { 
                ...state, 
                fetching: false, 
                fetched: true,
                data: action.payload.data
            }
        case 'FETCH_TODOS_REJECTED':
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
