import { FETCH_USERS, FETCH_TODOS, FETCH_COMMENTS } from '../../constants'
import instance from '../../axiosconfig';
import axios from 'axios'

export const fetchUsers = () => ({
    type: FETCH_USERS,
    payload: instance.get('/users'),
    meta: {table: 'users', COLLECTION: 'USERS'}
})

export const  fetchTodos = () => ({
    type: FETCH_TODOS,
    payload: instance.get('/todos'),
    meta: {table: 'todos', COLLECTION: 'TODOS'}
})

export const fetchComments = () => ({
        type: FETCH_COMMENTS,
        payload: instance.get('/comments'),
        meta: {table: 'comments', COLLECTION: 'COMMENTS'}
})

const demoInstance = axios.create({
    baseURL: 'http://localhost:5000'
})

export const fetchHaulers = () => ({
    type: 'FETCH_HAULERS',
    payload: demoInstance.get('/haulers'),
    meta: {table: 'haulers', COLLECTION: 'HAULERS'}
})