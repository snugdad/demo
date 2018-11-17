import  Observable, { pipe }  from 'rxjs'
import instance from '../axiosconfig'
import { ofType } from 'redux-observable'
import { filter, mapTo } from 'rxjs/operators'


export default action$ => action$.pipe(
    filter(action => action.type === 'PING'),
    mapTo({type: 'PONG'})
);

