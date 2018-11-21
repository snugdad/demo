import ActionGroups from './ActionGroups';
import Collection from './Collection';
import Identifiers from './Identifiers';
import ReactComponent from './ReactComponent';
import Validation from './Validation';

interface Container {
    identifiers: Identifiers,
    actionGroups?: ActionGroups,
    collection?: Collection<any>,
    view?: ReactComponent,
    validation?: Validation<any>,
}

export { 
    ActionGroups,
    Collection,
    Identifiers,
    ReactComponent,
    Validation,
    Container 
};