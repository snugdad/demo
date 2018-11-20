import LiquidTraceStartupState from '../initState'
import Entity from '../initState/Entity';

interface EntityContainer {
  [entity: string]: Entity,
}

class LiquidTraceApp {
    public entities: any;

    public constructor(initialState: LiquidTraceStartupState) {
        super(initialState);
        this.entities = this.createAppEntities(initialState);
    }

    createAppEntities(initialState): EntityContainer {
      const entities: EntityContainer = {};
      initialState.index.forEach(entityName => 
        entities[entityName] = new LiquidTraceEntity(initialState[entityName]));
      return entities
    }
}

export default LiquidTraceApp;