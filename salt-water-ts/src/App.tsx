import * as React from 'react';
import '@progress/kendo-theme-default/dist/all.css';
import { connect } from 'react-redux';
import {Grid, GridColumn as Column, GridProps, GridColumnProps} from '@progress/kendo-react-grid'




field?: string;

title?: string;

editable?: boolean;

sortable?: boolean;

cell?: ComponentType<GridCellProps>;

filterCell?: ComponentType<GridFilterCellProps>;

filterable?: boolean;

filter?: 'text' | 'numeric' | 'boolean' | 'date';

editor?: 'text' | 'numeric' | 'boolean' | 'date';

width?: string | number;

minResizableWidth?: number;

headerCell?: ComponentType<GridHeaderCellProps>;

headerSelectionValue?: boolean;

format?: string;

headerClassName?: string;

className?: string;

reorderable?: boolean;
resizable?: boolean;
orderIndex?: number;
groupable?: boolean;



function ColumnGroup(props: ColumnGroupProps) {
  const columns = [];

}

class UserManagement extends Grid {
  public render() {
    return (
      <div className="User-Management-Grid">
        <Grid/>
      </div>
    );
  }
}


export default UserManagement;
