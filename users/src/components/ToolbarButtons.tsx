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
 

const styles = (theme: any) => ({
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
});

class ToolbarButtons extends Component <any, {}> {

  render () {
    const { classes, cancelChanges, enterCreateMode, backupData, tableData, inEdit, createUser, updateUser } = this.props;
    const userInEdit = tableData.find((user: User) => user.id === inEdit);
    const backupUserData = backupData.find((user: User) => user.id === inEdit);
    const changed = JSON.stringify(userInEdit) !== JSON.stringify(backupUserData)
    console.log(changed)
  return (
    
    <div>
      <Button variant="contained" size="small" color="secondary" className={classes.button}>
      <DeleteIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
        Delete
      </Button>
      <Button variant="contained" size="small"color="primary" className={classes.button}
        onClick={enterCreateMode}>
      <AddIcon className={classNames(classes.leftIcon, classes.iconSmall)}/>
        Create
      </Button>
      <Button variant="contained" size="small" className={classes.button} 
        disabled={!changed || !valid(userInEdit)}
        onClick={e => inEdit === 'temp' ? createUser(userInEdit): updateUser(userInEdit)}>
        <SaveIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
        Save
      </Button>
      <Button variant="contained" size="small" className={classes.button}
        onClick={e => cancelChanges(backupData)}>
        <CancelIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
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
    }
  }
}




export default connect(mapStateToProps, mapDispatchToProps)(ToolbarButtons);