import * as React from 'react';
import { connect } from 'react-redux'
import { GridItemChangeEvent, GridCellProps } from '@progress/kendo-react-grid'
import { changeItem } from '../ducks/UserManagement'

const InEditCheckbox = (props: any) =>{
    const {dataItem, field, value, onItemChange} = props
    console.log(props)
    return (
        <td style={{ textAlign: "center", verticalAlign: "middle" }}>
            <input type='checkbox'
             id={field} 
             className='k-checkbox' 
             defaultChecked={value}
             onChange={(e: any) =>{
                 e.dataItem = dataItem
                 e.field = field,
                 e.value = !value, 
                 onItemChange(e)}}
            />
            <label className="k-checkbox-label" htmlFor={field}/>
        </td>
    )
}

const StaticCheckbox = (value: any) => {
    return (
        <td style={{ textAlign: "center", verticalAlign: "middle" }}>
        <input type="checkbox" className="k-checkbox" defaultChecked={value} />
        <label className="k-checkbox-label" />
    </td>
    )
}

interface CheckboxCellProps {
    dataItem: any,
    field: string,
    onItemChange(e: GridItemChangeEvent): void;
}

class CheckboxCell extends React.Component<any, {}> {
    render () {
        const { dataItem, field, onItemChange } = this.props
	    const value = dataItem[field];
        return (
            dataItem.inEdit ? 
                InEditCheckbox({dataItem, field, onItemChange, value}) : 
                value ? StaticCheckbox(value) : <td></td>
        )
    }
}

function mapDispatchToProps(dispatch: any) {
  return {
    onItemChange: (e: GridItemChangeEvent) => {
      dispatch(changeItem(e.dataItem.id, e.field, e.value))
    }
  }
}

export default connect(null, mapDispatchToProps)(CheckboxCell);