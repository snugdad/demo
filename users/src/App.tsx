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
import { CheckboxCell, ToolbarButtons } from './components'

interface UserGridProps {
  data: User[];
  backup: User[];
  sort: SortDescriptor[];
  filter: CompositeFilterDescriptor;
  inEdit: string | null;
  editLocked: boolean;
  cancelChanges(rollbackData: User[]): void;
  enterCreateMode(): void;
  onSortChange(e: GridSortChangeEvent): void;
  onRowClick(e: GridRowClickEvent): void;
  onItemChange(e: GridItemChangeEvent): void;
  onFilterChange(e: GridFilterChangeEvent): void;
  getAllUsers(): void;
  syncData(data: User[]): void;
}

const header = {
  id: { title: 'ID', filter: 'text' },
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

  componentDidMount() {
    // this.props.getAllUsers();
  }

  createColumns(header: any): JSX.Element[] {
    return Object.keys(header).map((key) => {
        const { title, filter } = header[key]
        const hasCheckboxCell = filter === 'boolean'

      return hasCheckboxCell ? 
        <Column 
          key={key}
          field={key}
          title={title}
          filter={filter}
          resizable
          editor="boolean"
          //cell={(props) => <CheckboxCell {...props}/>}
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
      syncData,
      getAllUsers,
      inEdit,
      editLocked,
      filter } = this.props

    const tableData = orderBy(filterBy(data.map((user: User) => 
      Object.assign({ inEdit: user.id === inEdit}, user)), filter), sort)

    return (
      <React.Fragment>
      
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
        {this._columns}
      </Grid>
      </Paper>
      <Button onClick={getAllUsers}>
        Get All 
      </Button>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state: DevGridState) {
  return {
    data: state.editor.data,
    inEdit: state.editor.inEdit,
    editLocked: state.editor.editLocked,
    backup: state.collection.data,
    sort: state.sort,
    filter: state.filter,
  }
}

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
