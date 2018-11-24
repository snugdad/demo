import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add'
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel'
import { cancelChanges } from '../ducks/UserManagement';
import * as ActionGroup from '../ducks/UserManagement';
import { User } from '../types';
import { connect } from 'react-redux';
import { userPassesConstraintValidation as valid } from '../validation'
import { Action } from '@progress/kendo-react-dateinputs/dist/npm/calendar/models';
 

const styles = ({
  button: {
    margin: '5px'
  },
  icon: {
    fontSize: 20,
  }
});

class ToolbarButtons extends Component <any, {}> {

  render () {
    const {
      cancelChanges,
      enterCreateMode,
      backupData,
      tableData,
      inEdit,
      createUser,
      updateUser,
      softDeleteUser } = this.props;
    const userInEdit = tableData.find((user: User) => user.id === inEdit);
    const backupUserData = backupData.find((user: User) => user.id === inEdit);
    const changed = JSON.stringify(userInEdit) !== JSON.stringify(backupUserData)
    console.log(changed)
  return (
    
    <div>
      <Button  variant="contained" size="small" color="secondary" style={styles.button}
        onClick={softDeleteUser}>
      <DeleteIcon style={styles.icon} />
        Delete
      </Button>
      <Button variant="contained" size="small"color="primary" style={styles.button}
        onClick={enterCreateMode}>
      <AddIcon style={styles.icon}/>
        Create
      </Button>
      <Button variant="contained" size="small" style={styles.button} 
        disabled={!changed || !valid(userInEdit)}
        onClick={e => inEdit === 'temp' ? createUser(userInEdit): updateUser(userInEdit)}>
        <SaveIcon style={styles.icon} />
        Save
      </Button>
      <Button variant="contained" size="small" style={styles.button}
        onClick={e => cancelChanges(backupData)}>
        <CancelIcon style={styles.icon} />
        Cancel
      </Button>

    </div>
  );
}
}

function mapStateToProps (state: any) {
  return {
    backupData: state.collection.data,
    tableData: state.editor.data,
    inEdit: state.editor.inEdit,
    classes: styles
  }
}

function mapDispatchToProps (dispatch: any) {
  return {
    cancelChanges: (backup: User[]) => {
      dispatch(ActionGroup.cancelChanges(backup))
    },
    enterCreateMode: () => {
      dispatch(ActionGroup.enterCreateMode())
    },
    createUser: (newUser: User) => {
      dispatch(ActionGroup.createUser(newUser))
    },
    updateUser: (updateUser: Partial<Pick<User, 'id'>>) => {
      dispatch(ActionGroup.updateUser(updateUser))
    },
    softDeleteUser: () =>{
      dispatch(ActionGroup.softDeleteUser())
    }
  }
}




export default connect(mapStateToProps, mapDispatchToProps)(ToolbarButtons);