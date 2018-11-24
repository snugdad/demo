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

interface IActionGroupsRunTime {
    index: string[],
    actionGroups: IActionGroups
}


interface ICollections<T> {
    [collection: string]: {
        [id: string]: T
    }
}

interface ICollectionsRunTime {
    config: CollectionConfig,
    fetching: boolean,
    fetched: boolean,
    index: string[],
    collections: ICollections<any> [],
}

interface IValidationResults<T> {
    [primaryKey: string]: {
        entry: T,
        context?: IValidationContext<T>
        result: IValidationResponse<T>,
    }  
}

interface IValidationRunTime {
    fetching: string | null,
    fetched: string[],
    toValidate: string[],
    validated: string[],
    validator: Validator<any>[],
    results: IValidationResults<any>
}

interface IValidationStartupState {
    validators: Validator<any> [],
    setupValidation: () => IValidationRunTime
}

interface IContainerRunTime {
    containerID: ContainerID,
    actionGroups?: IActionGroupsRunTime,
    collections?: ICollectionsRunTime,
    validation?: IValidationRunTime
}

export {
    IActionGroups,
    IActionGroupsRunTime,
    ICollections,
    IContainerRunTime
};