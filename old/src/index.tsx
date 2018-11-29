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
import errorMiddleware from './middleware'

const rootReducer = combineReducers(reducers)
const epicMiddleware = createEpicMiddleware();

export default function configureStore() { 
    const createdStore = createStore( 
        rootReducer,
        applyMiddleware( epicMiddleware, errorMiddleware, logger, promise(),))
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

/**
 * The following is an example of how to create an action that displays an error to the user,
 * simply uncomment the dispatch below to fire the action when the application starts.
 */

export const networkErrorAction = (): any => ({
    type: 'NETWORK_ERROR',
    /* When you throw an error, always instantiate a new Error object with `new Error()` */
    payload: new Promise((resolve, reject) => {
        axios.get('http//localhost:5000/notAnEndpoint')
            .then((response: any) => {
                resolve(response.json().then((json: any) => (
                    json
                )))
            })
            .catch(({ response, request, message }: any) => {
                reject(
                    response ? new Error(`Server responded with status ${response.status}, ${response.statusText}`) :
                        request ? new Error(`No response from server: request details: ${JSON.stringify(request)}`) :
                            new Error(`Error in request setup: ${message}`)
                )
            })
    })
})

//store.dispatch(networkErrorAction());
