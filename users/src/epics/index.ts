import  { syncData } from '../ducks/UserManagement'

import { switchMap, map, mapTo, filter, delay, withLatestFrom} from 'rxjs/operators'
import { pipe } from 'rxjs'

const logValue = (payload: any) => ({
    type: "LOG_VALUE",
    payload: payload
})



export default (action$: any, state$: any) => action$.pipe(
    filter((action: any) => action.type.includes('FULFILLED')),
    withLatestFrom(state$),
    map(() => syncData(state$.value.collection.data))
)