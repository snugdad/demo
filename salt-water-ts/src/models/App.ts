import LiquidTraceEntity from './Entity'

type ReduxAppEntity = any;
type ReduxAppStartupState = any;
type ReduxAppLiveState = any;
type ReduxAppEntities = any;

interface StateContainer {
    createAppEntities(initialState: ReduxAppStartupState | ReduxAppLiveState): ReduxAppEntities
}

  /* Set up default ReduxApp behavior (routes for logging/serializing state etc) */
abstract class ReduxApp implements StateContainer {
    private _initializedFrom: ReduxAppStartupState | ReduxAppLiveState
    public entities: ReduxAppEntities;
  
    constructor (initialState: ReduxAppStartupState | ReduxAppLiveState) {
      this._initializedFrom = initialState;
    }
  
    abstract createAppEntities(initialState: ReduxAppStartupState): ReduxAppEntities
}

class LiquidTraceApp extends ReduxApp {
    public entities: any;

    public constructor(initialState: ReduxAppStartupState | ReduxAppLiveState) {
        super(initialState);
        this.entities = this.createAppEntities(initialState);
    }

    createAppEntities(initialState): ReduxAppEntities {
      const entities: ReduxAppEntities = {};
      initialState.index.forEach(entityName => 
        entities[entityName] = new LiquidTraceEntity(initialState[entityName]));
      return entities
    }
}

export default LiquidTraceApp;