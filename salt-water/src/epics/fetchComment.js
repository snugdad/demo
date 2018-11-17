import  Observable  from 'rxjs'
import instance from '../axiosconfig'
import { fetchComments } from '../actions'

import { ofType } from 'redux-observable'
import { switchMap, map, mapTo, filter} from 'rxjs/operators'
import { pipe } from 'rxjs'
switchMap()
const FETCH_COMMENT = 'FETCH_COMMENT'

const fetchCommentSuccess = () => ({
    type: "FETCH_COMMENT_SUCCESS",
    payload: data
})

const fetchCommentError = () => ({
    type: 'FETCH_COMMENT_ERROR',
    payload: error
})

const fetchComment = (state) => {
    const id = state.fetchId
    return Observable.of(instance.get(`/comments/${id}`));
}

export default (action$, store) => action$.pipe(
    filter(FETCH_COMMENT),
    switchMap(() => 
        fetchComment(store.getState())),
            map(fetchCommentSuccess()),
)
