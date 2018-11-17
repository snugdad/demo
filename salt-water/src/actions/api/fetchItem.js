import { FETCH_USER, FETCH_TODO, FETCH_COMMENT } from '../../constants'
import instance from '../../axiosconfig';

export const fetchUser = (id) => ({
    type: FETCH_USER,
    payload: instance.get(`/users/${id}`),
    meta: { 
        id: id, 
        table: 'users',
        ITEM: 'USER' 
    }
});

export const  fetchTodo = (id) => ({
    type: FETCH_TODO,
    payload: instance.get(`/todos/${id}`),
    meta: { 
        id: id, 
        table: 'todos',
        ITEM: 'TODO' 
    }
});

export const fetchComment = (id) => ({
        type: FETCH_COMMENT,
        payload: instance.get(`/comments/${id}`),
        meta: { 
            id: id, 
            table: 'comments',
            ITEM: 'COMMENT' 
        }
});