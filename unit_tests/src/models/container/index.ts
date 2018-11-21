import * as InitialState from './startup'


class LiquidTraceContainer {
    private _identifiers: any;
    public view: any;
    public actionGroups: any;
    public validation: any;
    public collection: any;


    public constructor({ identifiers, actionGroups, collection, view, validation }: InitialState.Container) {
      this._identifiers = this.processIdentifiers(identifiers);
      this.collection = this.setupCollection(collection);
      this.actionGroups = this.createActionGroups(actionGroups);
      this.validation = this.setupValidation(validation);
      this.view = this.createReactComponent(view);

    }

    identifiers() {
      return this._identifiers
    }

    processIdentifiers({id, key, title}: InitialState.Identifiers){
      /* 
        Process identifiers and make optional changes to meta data
        that affect the container's instantiation based on context.
      */

      const identifiers: InitialState.Identifiers = {id: id, key: key, title: title}
      return identifiers;
    }

    createReactComponent(initialState: InitialState.ReactComponent) {
      const view: any = {}
      // switch(initialState.type) {
      //   case 'kendo-grid':
      //     return view //setupKendoGrid(config)
      //   case 'inspector':
      //     return view //setupInspector(config)
      //   default:
      //     return view // empty
      // }
      return view;
    }

    createActionGroups(initialState: InitialState.ActionGroups) {
      const actionGroups: any = {};

      // initialState.index.forEach(groupName => 
      //   actionGroups[groupName] = new LiquidTraceActionGroup(this._identifiers, initialState[groupName]))
      return actionGroups;
    }

    setupValidation<T>(initialState: InitialState.Validation<T>) {
      /* set up validations for type of data that we need to operate on set up methods for createCollection */
      const validation: any = {};
      return validation;
    }

    setupCollection<T>(initialState: InitialState.Collection<T>) {
      /* call getAll to get and use the validations to verify data integrity */
      const collection: any = {};
      return collection;
    }
}

export default LiquidTraceContainer;