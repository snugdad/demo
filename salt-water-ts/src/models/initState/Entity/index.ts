import ActionGroups from './ActionGroups'
import Collection from './Collection'
import Identifiers from './Identifiers'
import ReactComponent from './ReactComponent'
import Validation from './Validation'


interface Entity {
    actionGroups?: ActionGroups,
    identifiers: Identifiers,
    collection?: Collection<any>,
    component?: ReactComponent,
    validation?: Validation<any>,
}



export { ActionGroups,
         Collection,
         Identifiers,
         ReactComponent,
         Validation,
         Entity };