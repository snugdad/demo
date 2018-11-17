// import todos from './todosReducer'
// import users from './usersReducer'
// import comments from './commentsReducer'
import { combineReducers } from 'redux';
import tables from './requests'

function gridIndex(state=['users', 'todos', 'comments', 'haulers'], action) {
    switch(action.payload){
        default:
            return state;
    }
}

export default combineReducers({
    gridIndex,
    tables
})