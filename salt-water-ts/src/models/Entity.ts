import LiquidTraceActionGroup from './ActionGroup'

interface IVisualComponentInitialState {
    type: string;
  }

  interface IActionGroups {
    index: string[];
  }
  
  interface EntityIdentifier {
     key: string;
     id: string | number;
     title: string;
  }
  
class LiquidTraceEntity {
    private _identifiers;
    public component;
    public actionGroups;
    public validation;
    public collection;


    public constructor({ identifiers, component, actionGroups, collection, validation }){
      this._identifiers = this.processIdentifiers(identifiers) // process later
      this.component = this.createReactComponent(component);
      this.actionGroups = this.createActionGroups(actionGroups);

      /*
        Optionally set up validation and collection if this component requires,
        typically for container components
      */

      this.validation = this.setupValidation(validation)
      this.collection = this.setupCollection(collection)
    }

    processIdentifiers({id, key, title}){
      /* 
        Process identifiers and make optional changes to meta data
        that affect the entity's instantiation.
       
      */
      const identifier: EntityIdentifier = {id: id, key: key, title: title}
      return identifier;
    }

    createReactComponent(initialState: IVisualComponentInitialState) {
      const component: any = {}
      switch(initialState.type) {
        case 'kendo-grid':
          return component //setupKendoGrid(config)
        case 'inspector':
          return component //setupInspector(config)
        default:
          return component // empty
      }
    }

    createActionGroups(initialState: IActionGroups) {
      const actionGroups: any = {};

      initialState.index.forEach(groupName => 
        actionGroups[groupName] = new LiquidTraceActionGroup(this._identifiers, initialState[groupName]))
    }

    setupValidation(initialState: any) {
      /* set up validations for type of data that we need to operate on set up methods for createCollection */
      const validation: any = {};
      return validation;
    }

    setupCollection(initialState: any) {
      /* call getAll to get and use the validations to verify data integrity */
      const collection: any = {};
      return collection;
    }
}

export default LiquidTraceEntity;