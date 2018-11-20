import { getActionStatus } from '../../actions/types'

export default (state: any={}, action: any) => {
    console.log(`called with ${action.type}`)
    switch(getActionStatus(action.type)) {
        case 'PENDING':
            return {...state, fetching: true};
        case 'FULFILLED':
            return {
                ...state,
                fetching: false,
                fetchedList: [
                    ...state.fetchedList,
                    action.payload.data,
                ]
            };
        case 'REJECTED':
            return {
                ...state,
                fetching: false,
                fetchErrors:[
                    ...state.fetchErrors,
                    action.payload.data
                ]
            };
        default:
            return state;
    }
}








// export default (state={}, action) => {
//     const { id, ITEM } = action.meta
//     switch (action.type) {
//         case `FETCH_${ITEM}_PENDING`:
//             return { ...state, fetching: id }
//         case `FETCH_${ITEM}_FULFILLED`:
//             return { 
//                 ...state, 
//                 fetching: null, 
//                 validEntries: {
//                     ...state.validEntries,
//                    id: action.payload.data
//                 }
//             }
//         case `FETCH_${ITEM}_REJECTED`:
//             return { 
//                 ...state, 
//                 fetching: null, 
//                 invalidEntries: {
//                     ...state.invalidEntries,
//                     id: action.payload
//                 }
//             }
//     }
// }
