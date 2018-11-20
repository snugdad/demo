import httpClient from '../../httpClient'
import { createAction } from 'typesafe-actions'


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

export const assignHttpActionCreator = (entity: any, resource: string, actionName: string) => {
    if (!httpClient.endpoints.hasOwnProperty(resource)) {
        httpClient.createEntity({name: resource});
    }
    return httpActionCreators[actionName](entity, resource);
}
