import { assignHttpActionCreator } from './http'
import { ContainerID } from '../../models/store'
interface IActionGroup {
    entityID: ContainerID
}

const actionCreators = {
    http: assignHttpActionCreator,
}


class ActionGroup {
    public entityID: any;
    public actionNames: string[];
    public groupName: string;
    public actions: any;
    public errors: Error[];

    public constructor(entityID: any, groupName: string, actionNames: string []) {
        this.entityID = entityID;
        this.actionNames = actionNames;
        this.actions = this.createActionGroup(actionNames, groupName);
    }

    createActionGroup(actionNames: string[], actionGroupName: string) {
        const actions: any = {};
        actionNames.forEach(name => {
            actions[name] = actionCreators[actionGroupName](this.entityID, name); 
        })
        return actions;
    }
}

export default ActionGroup;