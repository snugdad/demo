import { Container } from './models/container/startup'

const todos: Container = {
    identifiers: {
      key: 'todos',
      id: 'todos-Table',
      title: 'Todos',
    },
    actionGroups: {
      index: ['http'],
      groups: {
        http: ['getAll', 'getOne', 'update', 'create']
      }
    },
    collection: {
      fetching: false,
      fetched: false,
      data: [],
    },
    view: {
      type: 'kendo-grid',
      config:{
        columns:{
          key: 'hex-string',
          field: 'todos',
        }
      },
    },
    validation: {
      fetching: null,
      fetched: [],
      validators: [],
      toValidate: [],
      results: {},
    }
}

const users: Container = {
    identifiers: {
    key: 'todos',
    id: 'todos-Table',
    title: 'Todos',
    },
    actionGroups: {
      index: ['http'],
      groups: {
        http: ['getAll', 'getOne', 'update', 'create']
      }
    },
    collection: {
      fetching: false,
      fetched: false,
      data: [],
    },
    view:{
      type: 'kendo-grid',
      config:{
        columns:{
          key: 'hex-string',
          field: 'todos',
        }
      },
    },
    validation: {
      fetching: null,
      fetched: [],
      validators: [],
      toValidate: [],
      results: {},
    }
}