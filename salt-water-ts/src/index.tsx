import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import logger from 'redux-logger';
import promise from 'redux-promise-middleware';
import { HaulerActions } from './actions/api/tables/haulers'
// import rootReducer from './reducers'

import { getHaulerActionSuperType, HAULER_COLLECTION, HAULER_VALIDATION } from './actions/types'
import { IHauler } from './models/gridDataTypes'
import { InitialGridState } from './models/state'

import collection from './reducers/tables/collection'
import validation from './reducers/tables/validation'

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

const rootReducer = (state=initialState, action: any) => {

  switch(getHaulerActionSuperType(action.type)) {
      case HAULER_COLLECTION:
          return { ...state, collection: collection(state.collection, action) }
      case HAULER_VALIDATION:
          return { ...state, validation: validation(state.validation, action) }
      default:
          return state;
  }
}

const enhancer = applyMiddleware(logger, promise());

const store = createStore(rootReducer, enhancer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);

store.dispatch(HaulerActions.getAll())

registerServiceWorker();
