import  Observable  from 'rxjs'
import  { MarkCollectionUpdated, assignData } from '../ducks/UserManagement'
import { store } from '../index'
import { ofType } from 'redux-observable'
import { switchMap, map, mapTo, filter, delay, withLatestFrom} from 'rxjs/operators'
import { pipe } from 'rxjs'

const logValue = (payload: any) => ({
    type: "LOG_VALUE",
    payload: payload
})



export default (action$: any, state$: any) => action$.pipe(
    filter((action: any) => action.type.includes('FULFILLED')),
    withLatestFrom(state$),
    map(() => assignData( state$.value.collection.data ))
)