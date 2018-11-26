import React, { Component } from 'react';
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import '@progress/kendo-theme-default/dist/all.css'
import * as ActionGroup from './ducks/UserManagement'
import { User, } from './types'
import {GridState as DevGridState} from './ducks'
import {
  Grid,
  GridColumn as Column,
  GridSortChangeEvent,
  GridRowClickEvent,
  GridItemChangeEvent, 
  GridFilterChangeEvent,
  GridToolbar } from '@progress/kendo-react-grid'

import { 
  CompositeFilterDescriptor, 
  SortDescriptor, 
  orderBy, 
  filterBy } from '@progress/kendo-data-query';

import { Paper } from '@material-ui/core'
import { 
  CheckboxCell, 
  ToolbarButtons, 
  AlertDialog } from './components'

interface UserGridProps {
  data: User[];
  backup: User[];
  sort: SortDescriptor[];
  filter: CompositeFilterDescriptor;
  inEdit: string | null;
  editLocked: boolean;
  showPasswordColumn: boolean;
  cancelChanges(rollbackData: User[]): void;
  enterCreateMode(): void;
  onSortChange(e: GridSortChangeEvent): void;
  onRowClick(e: GridRowClickEvent): void;
  onItemChange(e: GridItemChangeEvent): void;
  onFilterChange(e: GridFilterChangeEvent): void;
  getAllUsers(): void;
  syncData(data: User[]): void;
}

/**
 * Comment out the the columns you dont want, add ones you do.
 * The rules are only that the title is a string, and the filter 
 * corresponds to the type of the field. The field name, and array key
 * are passed as the property key.
 */

const header = {
  //id: { title: 'ID', filter: 'text' },
  username: { title: 'Username', filter: 'text' },
  firstName: { title: 'First Name', filter: 'text' },
  lastName: { title: 'Last Name', filter: 'text'},
  isActive: { 
    title: 'Active',
    filter: 'boolean',
    cell: CheckboxCell,
  },
  isEntryAdmin: { 
    title: 'Entry Admin',
    filter: 'boolean',
    cell: CheckboxCell,
  },
  isListAdmin: { 
    title: 'List Admin',
    filter: 'boolean',
    cell: CheckboxCell,
  },
  isLocationManager: { 
    title: 'Location Manager',
    filter: 'boolean',
    cell: CheckboxCell,
  },
  isOperatorAdmin: { 
    title: 'Operator Admin',
    filter: 'boolean',
    cell:CheckboxCell,
  },
  isUserAdmin: { 
    title: 'User Admin',
    filter: 'boolean',
    cell: CheckboxCell,
  },
}

/**
 * Controls the css properties of the container components
 */
const styles = {
  paper: {
    padding: 8 * 3,
    elevation: 10,
    maxHeight: 750,
  },
  grid: {
    maxHeight: 750
  }
}

class UserGrid extends Component<UserGridProps, {}> {

  private _columns: JSX.Element[];

  public constructor (props: UserGridProps) {
    super(props);
    this._columns = this.createColumns(header)
  }

  createColumns(header: any): JSX.Element[] {
    return Object.keys(header).map((key) => {
        const { title, filter } = header[key]
        const hasCheckboxCell = filter === 'boolean'
      /**
       * Every boolean cell has an applicable override attached to the header.
       * You can change whether this component is displayed as default, or with
       * the cell override by uncommenting/commenting the cell property. 
       * CheckboxCell is not finished, but it works for getting the feel 
       * of how it would look. If you like it, I can get that 100%.
       */
      return hasCheckboxCell ? 
        <Column 
          key={key}
          field={key}
          title={title}
          filter={filter}
          resizable
          editor="boolean"
          // cell={(props) => <CheckboxCell {...props}/>}
          /> :
        <Column 
          key={key} 
          field={key} 
          title={title}
          resizable
          filter={filter}
          />  
    })
  }
  render() {
    const { 
      data,
      sort,
      onSortChange,
      onRowClick,
      onItemChange,
      onFilterChange,
      getAllUsers,
      inEdit,
      filter,
      showPasswordColumn } = this.props

      /**
       * This function orders and sorts the data on every render when
       * the sort and filter descriptors have at least one element. 
       */
      const tableData = orderBy(filterBy(data.map((user: User) => 
        Object.assign({ inEdit: user.id === inEdit}, user)), filter), sort)

    return (
      <React.Fragment>
      <AlertDialog/>
      <Paper style={styles.paper}>
      <Grid style={styles.grid}
        data={tableData}
        sort={sort}
        filter={filter}
        editField="inEdit"
        onSortChange={onSortChange}
        onRowClick={onRowClick}
        onItemChange={onItemChange}
        onFilterChange={onFilterChange}
        filterable
        resizable
        sortable
        reorderable
      >
      <GridToolbar>
        <ToolbarButtons/>
      </GridToolbar>
    
        {[ this._columns,
        /**
         * Since the password column is transient, this is it's configuration, separate from
         * the group returned by this.generateColumns() called in the constructor.
         */
        showPasswordColumn ? <Column key="password" field="password" title="Password"/> : null ]}
      </Grid>
      </Paper>
      <Button onClick={getAllUsers}>
        Get Data 
      </Button>
      </React.Fragment>
    );
  }
}

/**
 * The mapStateToProps method receives the value of store.getState() as its
 * argument. The key corresponds to the name of the props key in the component.
 * For example, data: state.editor.data, provides the value of state.editor.data,
 * to props.data in the component (props.data = state.editor.data). This is where
 * you can map out what state the component receives from the Provider as props.
 */

function mapStateToProps(state: DevGridState) {
  return {
    data: state.editor.data,
    inEdit: state.editor.inEdit,
    editLocked: state.editor.editLocked,
    showPasswordColumn: state.ui.showPasswordColumn,
    backup: state.collection.data,
    sort: state.sort,
    filter: state.filter,
  }
}
/**
 * The mapDispatchToProps function provides the methods available to be called
 * by the component as props. A method name in the UserGrid component 
 * matching one of the names below is an alias for dispatching that action
 * using store.dispatch() method provided as its argument.
 *    
 */
function mapDispatchToProps(dispatch: any) {
  return {
    cancelChanges: (rollbackData: User[]) => {
      dispatch(ActionGroup.cancelChanges(rollbackData))
    },
    enterCreateMode: () => {
      dispatch(ActionGroup.enterCreateMode())
    },
    onSortChange: (e: GridSortChangeEvent) => {
      dispatch(ActionGroup.changeSort(e.sort))
    },
    onRowClick: (e: GridRowClickEvent) => {
      dispatch(ActionGroup.selectRow(e.dataItem.id))
    },
    onItemChange: (e: GridItemChangeEvent) => {
      dispatch(ActionGroup.changeItem(e.dataItem.id, e.field, e.value))
    },
    getAllUsers: () => dispatch(ActionGroup.getAllUsers()),
    onFilterChange: (e: GridFilterChangeEvent) => {
      dispatch(ActionGroup.changeFilter(e.filter))
    },
    syncData: (data: User[]) => {
      dispatch(ActionGroup.syncData(data));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserGrid);
