import { assignHttpActionCreator } from './http'


const actionCreators = {
    http: assignHttpActionCreator,
}


export default class {
    public entityID: any
    public actions: any;
    public errors: Error[];

    public constructor(entityID: any, actionGroupName: string) {
        this.entityID = entityID;
        const actionNames = Object.keys(actionGroupName);
        this.actions = this.createActionGroup(actionNames, actionGroupName)
    }

    createActionGroup(actionNames: string[], actionGroupName: string) {
        const actions: any = {}
        actionNames.forEach(name => {
            actions[name] = actionCreators[actionGroupName](this.entityID, name); 
        })
        return actions;
    }
}
