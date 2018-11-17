import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import "@progress/kendo-theme-default/dist/all.css"
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux'
import logger from 'redux-logger';
import promise from 'redux-promise-middleware';
import axios from 'axios';
import 'rxjs'
import * as reducers from './reducers';
import {fetchTodos, fetchUsers, fetchComments, fetchHaulers,
    fetchTodo, fetchUser, fetchComment, } from './actions/api';
import instance from './axiosconfig'
import thunk from 'redux-thunk'
import rootReducer from './reducers/api'
import pingEpic from './epics/pingEpic'
import { createEpicMiddleware } from 'redux-observable'
const initialState = {
    fetching: false,
    fetched: false,
    users: [],
    error: null
}


// const rootReducer = (state=initialState, action) => {
//     switch (action.type) {
//         case 'FETCH_USERS_PENDING':
//         return { ...state, fetching: true }
//         case 'FETCH_USERS_FULFILLED':
//         return { 
//             ...state, 
//             fetching: false, 
//             fetched: true,
//             users: action.payload 
//         }
//         case 'FETCH_USERS_REJECTED':
//         return { 
//             ...state, 
//             fetching: false, 
//             error: action.payload 
//         }
//         default:
//             return state
//     }
// }




const epicMiddleWare = createEpicMiddleware();
const store = createStore(
        rootReducer, applyMiddleware(logger, thunk, promise(), epicMiddleWare)
);
epicMiddleWare.run(pingEpic);
render(
<Provider store={store}>
<App/>
</Provider>, document.getElementById('root')
);

store.dispatch(fetchHaulers())
store.dispatch(fetchComments())

store.dispatch(fetchUser('5'))
store.dispatch(fetchUsers())

store.dispatch(fetchTodo('7'))
store.dispatch(fetchTodos())

// store.dispatch((dispatch) => {
//     dispatch({type: 'FETCH_USERS_PENDING'})
//     instance.get('/users')
//         .then((response) => {
//             dispatch({type: 'FETCH_USERS_FULFILLED', payload: response.data})
//         })
//         .catch( (err) => {
//             dispatch({type: "FETCH_USERS_REJECTED", payload: err})
//         })
// })
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
