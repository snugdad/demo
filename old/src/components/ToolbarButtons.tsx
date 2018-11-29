import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add'
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel'
import VpnKey from '@material-ui/icons/VpnKey'
import * as ActionGroup from '../ducks/UserManagement';
import { User } from '../types';
import { connect } from 'react-redux';
import { userPassesConstraintValidation as valid } from '../validation'
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';

 

const styles = ({
  container: {
    display: "flex",
  },
  button: {
    margin: '5px'
  },
  icon: {
    fontSize: 18,
    marginRight: '5px'
  },
  buttonRight: {
    margin: '5px',
    marginLeft: 'auto'
  }
});

const DeleteDialog = (props: any ) => {
  const { visible, softDeleteUser, close, userInEdit } = props;
  return (
  <React.Fragment>
    {visible &&  <Dialog title={"Confirm Delete"} onClose={close}>
      <p style={{ margin: "25px", textAlign: "center" }}>Are you sure you want to delete this user?</p>
    <DialogActionsBar>
    <div style={styles.container}>
      <Button variant="contained" size="small" color="secondary" style={styles.button}>
        Cancel
        </Button>
      <Button variant="contained" size="small" color="primary" style={styles.buttonRight}
        onClick={e => softDeleteUser({...userInEdit, isActive: false})}>
        Confirm
        </Button>
      </div>
    </DialogActionsBar>
    </Dialog>}
    </React.Fragment>
  )
}


class ToolbarButtons extends Component <any, {}> {

  render () {
    const {
      togglePasswordModal,
      showPasswordModal,
      cancelChanges,
      enterCreateMode,
      backupData,
      tableData,
      inEdit,
      createUser,
      updateUser,
      showDeleteConfirmation,
      toggleDeleteConfirmation,
      softDeleteUser } = this.props;
    const userInEdit = tableData.find((user: User) => user.id === inEdit);
    const backupUserData = backupData.find((user: User) => user.id === inEdit);
    const changed = JSON.stringify(userInEdit) !== JSON.stringify(backupUserData)
  return (
    
  <div style={styles.container} >
    <DeleteDialog 
      userInEdit={userInEdit} 
      visible={showDeleteConfirmation} 
      softDeleteUser={softDeleteUser} 
      close={toggleDeleteConfirmation} />
      <Button  
        variant="contained" size="small" color="secondary" style={styles.button}
        disabled={inEdit === null || inEdit === 'temp'}
        onClick={toggleDeleteConfirmation}>
      <DeleteIcon style={styles.icon} />
        Delete
      </Button>
      <Button 
        variant="contained" size="small"color="primary" style={styles.button}
        disabled={inEdit !== null}
        onClick={enterCreateMode}>
      <AddIcon style={styles.icon}/>
        Create
      </Button>
      <Button 
        variant="contained" size="small" style={styles.button} 
        disabled={!changed || !valid(userInEdit)}
        onClick={e => inEdit === 'temp' ? createUser(userInEdit): updateUser(userInEdit)}>
        <SaveIcon style={styles.icon} />
        Save
      </Button>
      <Button variant="contained" size="small" style={styles.button}
        disabled={!inEdit}
        onClick={e => cancelChanges(backupData)}>
        <CancelIcon style={styles.icon} />
        Cancel
      </Button>
      {inEdit !== null && <Button variant="contained" size="small" style={styles.buttonRight}
        onClick={togglePasswordModal}>
        <VpnKey style={styles.icon}/>
        Manage Password
      </Button>}

    </div>
  );
}
}

function mapStateToProps (state: any) {
  return {
    backupData: state.collection.data,
    tableData: state.editor.data,
    inEdit: state.editor.inEdit,
    classes: styles,
    showPasswordModal: state.ui.showPasswordModal,
    showDeleteConfirmation: state.ui.showDeleteConfirmation
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
    softDeleteUser: (toDelete: User) =>{
      dispatch(ActionGroup.softDeleteUser(toDelete))
    },
    togglePasswordModal: () => {
      dispatch(ActionGroup.togglePasswordModal())
    },
    toggleDeleteConfirmation: () => {
      dispatch(ActionGroup.toggleDeleteConfirmation())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolbarButtons);