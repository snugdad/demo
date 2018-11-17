import validation from './validationsReducer'
import collection from './collectionsReducer'

const isValidation = (meta) => {
    return meta.hasOwnProperty('id')
}

export const comments = (state={}, action) => {
    switch(isValidation(action.meta)) {
        case true:
            return {...state, validation: validation(state.validation, action) }
        default:
            return {...state, collection: collection(state.collection, action) }
    }
}

export const users = (state={}, action) => {
    switch(isValidation(action.meta)) {
        case true:
            return {...state, validation: validation(state.validation, action) }
        default:
            return {...state, collection: collection(state.collection, action) }
    }
}

export const todos = (state={}, action) => {
    switch(isValidation(action.meta)) {
        case true:
            return {...state, validation: validation(state.validation, action) }
        default:
            return {...state, collection: collection(state.collection, action) }
    }
}

export const haulers = (state={}, action) => {
    switch (isValidation(action.meta)) {
        case true:
            return { ...state, validation: validation(state.validation, action) }
        default:
            return { ...state, collection: collection(state.collection, action) }
    }

}