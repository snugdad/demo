import * as State from '../models/container/startup'


export namespace StartupState {
    export const basic: State.Container = {
        identifiers: {
            key: 'basic-container',
            id: 'test-container',
            title: 'Basic',
          },
    }

    export const withActions: State.Container = {
        identifiers: {
            key: 'basic-container',
            id: 'test-container',
            title: 'Basic',
          },
        actionGroups: {
            index: ['http'],
            groups: {
              http: ['getAll', 'getOne', 'update', 'create']
            }
          },
    }
}