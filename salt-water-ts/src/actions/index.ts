import { assignHttpActionCreator } from './http'


const assignActionCreator = (entityID: any, actionGroup: string, actionName: string) => {
    switch(actionGroup) {
        case 'http':
            return assignHttpActionCreator(entityID.key, entityID.key, actionName);
        default:
            return
    }
}

