import Entity from './Entity'

interface LiquidTraceStartupState {
    config: any,
    entities: {
        [entity: string]: Entity,
    }
}

const todos: Entity = {
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
    component:{
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
      validEntries: {},
      invalidEntries: {},
    }
}

const users: Entity = {
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
    component:{
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
      validEntries: {},
      invalidEntries: {},
    }
}

const startupState: LiquidTraceStartupState = {
    config: {},
    entities: {
        users: users,
        todos: todos,
    }

}

export default LiquidTraceStartupState;