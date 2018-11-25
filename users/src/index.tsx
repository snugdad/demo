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

const rootReducer = combineReducers(reducers)
const epicMiddleware = createEpicMiddleware();


export default function configureStore() { 
    const createdStore = createStore( 
        rootReducer,
        applyMiddleware(logger, promise(), epicMiddleware))
    epicMiddleware.run(updateEpic)
    return createdStore;
}
export const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <UserGrid />
    </Provider>, document.getElementById('root')
);



serviceWorker.unregister();
