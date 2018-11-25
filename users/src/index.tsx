import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers} from 'redux';
import logger from 'redux-logger';
import promise from 'redux-promise-middleware'
import * as reducers from './ducks'

import updateEpic from './epics'
import UserGrid from './App';
import * as serviceWorker from './serviceWorker';
import { createEpicMiddleware } from 'redux-observable'
import axios from 'axios'
const rootReducer = combineReducers(reducers)
const epicMiddleware = createEpicMiddleware();

/*
    Things to do tomorrow: 
        Add in modal 'ARE YOU SURE' form for deleting
        Add Password editing capabilities
        Add epic that filters xhr request errors into collection
*/

export default function configureStore() { 
    const createdStore = createStore( 
        rootReducer,
        applyMiddleware(logger, promise(), epicMiddleware))
    epicMiddleware.run(updateEpic)
    return createdStore;
}
export const store = configureStore();

store.dispatch({type: "GET", payload: axios.get('http://localhcost:5000/nothere')})

//store.dispatch({type:'REJECTED', payload: new Error('! Im an error !')})
ReactDOM.render(
    <Provider store={store}>
        <UserGrid />
    </Provider>, document.getElementById('root')
);

serviceWorker.unregister();
