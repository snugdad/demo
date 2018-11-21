import { IValidationContext, IValidationResponse } from "./Validation";
import {ActionCreator as IActionCreator} from 'typesafe-actions/dist/types'
import { ContainerID, CollectionConfig } from '../../types'
import { Validator } from '../app/validators'

interface IActionGroups {
    [group: string]: {
        [actionName: string]: 
            (containerID: ContainerID ) => IActionCreator<any>
    }
}

interface IActionGroupsLiveState {
    index: string[],
    actionGroups: IActionGroups
}


interface ICollections<T> {
    [collection: string]: {
        [id: string]: T
    }
}

interface ICollectionsLiveState {
    config: CollectionConfig,
    fetching: boolean,
    fetched: boolean,
    index: string[],
    collections: ICollections<any>
}

interface IValidationResults<T> {
    [primaryKey: string]: {
        entry: T,
        context?: IValidationContext<T>
        result: IValidationResponse<T>,
    }  
}

interface IValidationLiveState {
    fetching: string | null,
    fetched: string[],
    toValidate: string[],
    validated: string[],
    validator: Validator<any>[],
    results: IValidationResults<any>
}


interface IContainerLiveState {
    containerID: ContainerID,
    actionGroups?: IActionGroupsLiveState,
    collections?: ICollectionsLiveState,
    validation?: IValidationLiveState

}

export {
    IActionGroups,
    IActionGroupsLiveState,
    ICollection,
    IContainerLiveState
};