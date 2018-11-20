import { getHaulerActionSuperType, HAULER_COLLECTION, HAULER_VALIDATION } from '../../actions/types'
import { IHauler } from '../../models/gridDataTypes'
import { InitialGridState } from '../../models/state'

import collection from './collection'
import validation from './validation'



const initialState: InitialGridState<IHauler> = {
    grid: {
        index: ['id', 'userId', 'completed'],
        columnNames: {
            id: 'ID',
            userId: 'User ID',
            completed: 'Completed',
        }
    },
    collection: {
        data: [],
        fetching: false,
        fetched: false,
        error: null
    },
    validation: {
        fetching: false,
        fetched: false,
        fetchedList: [], 
        fetchErrors: [],
        validators: [],
        validEntries: {},
        invalidEntries: {},
    },
}

export default (state=initialState, action: any) => {

    switch(getHaulerActionSuperType(action.type)) {
        case HAULER_COLLECTION:
            return { ...state, collection: collection(state.collection, action) }
        case HAULER_VALIDATION:
            return { ...state, validation: validation(state.validation, action) }
        default:
            return state;
    }
}