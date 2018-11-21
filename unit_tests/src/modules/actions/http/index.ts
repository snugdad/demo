import { LiquidTraceClient } from '../../../models/app'
import { createAction } from 'typesafe-actions'


const config = {
    baseURL: 'https://jsonplaceholder.typicode.com'
}

const httpClient = new LiquidTraceClient(config);
const { endpoints } = httpClient

module httpActionCreators {
    export const getAll = (entity: string, resource: string) => 
        createAction(`${entity}/GET_ALL`, resolve => {
            return () => resolve(endpoints[resource].getAll())
    })

    export const getOne = (entity: string, resource: string) => 
        createAction(`${entity}/GET_ONE`, resolve => {
            return (id: string | number) => resolve(endpoints[resource].getOne({ id: id }));
    })

    export const create = (entity: string, resource: string) => 
        createAction(`${entity}/CREATE`, resolve => {
            return (item: any) => resolve(endpoints[resource].create(item));
    })

    export const update = (entity: string, resource: string) =>
        createAction(`${entity}/UPDATE`, resolve => {
            return (item: any) => resolve(endpoints[resource].update(item));
    })
}

export const assignHttpActionCreator = (entityID: any, actionName: string) => {
    if (!httpClient.endpoints.hasOwnProperty(entityID.key)) {
        httpClient.createEntity({name: entityID.key});
    }
    return httpActionCreators[actionName](entityID.title, entityID.key);
}
