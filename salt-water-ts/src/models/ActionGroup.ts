import actionGroups from '../actions/'

class LiquidTraceEntityActionGroup {
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
            actions[name] = actionGroups.assignActionCreator(this.entityID, actionGroupName, name); 
        })
        return actions;
    }

    assignEntityAction(actionName: any, actionGroup: any) {

    }
}