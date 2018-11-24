import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers} from 'redux';
import logger from 'redux-logger';
import promise from 'redux-promise-middleware'
import * as reducers from './ducks'

import UserGrid from './App';
import * as serviceWorker from './serviceWorker';

const rootReducer = combineReducers(reducers)
const createStoreWithMiddleware = applyMiddleware(
    logger, 
    promise())(createStore);
const store = createStoreWithMiddleware(rootReducer);

ReactDOM.render(
    <Provider store={store}>
        <UserGrid />
    </Provider>, document.getElementById('root')
);

console.log(store.getState())

serviceWorker.unregister();
