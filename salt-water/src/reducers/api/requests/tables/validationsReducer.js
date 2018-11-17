export default (state={}, action) => {
    const { id, ITEM } = action.meta
    switch (action.type) {
        case `FETCH_${ITEM}_PENDING`:
            return { ...state, fetching: id }
        case `FETCH_${ITEM}_FULFILLED`:
            return { 
                ...state, 
                fetching: null, 
                validEntries: {
                    ...state.validEntries,
                   id: action.payload.data
                }
            }
        case `FETCH_${ITEM}_REJECTED`:
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
