import React from 'react';
import * as ActionGroup from '../ducks/UserManagement'
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import { connect } from 'react-redux';

class AlertDialog extends React.Component <any, {}> {
    render () {
    const { visible, errors, close} = this.props
        console.log(errors[0])
        return (
            <React.Fragment>
                {visible && <Dialog title={"Error"} onClose={close}>
                    <p style={{ margin: "25px", textAlign: "center" }}>{errors.length > 0 ? errors[0].message : null}</p>
                    <DialogActionsBar>
                    </DialogActionsBar>
                </Dialog>}
            </React.Fragment>
        );
    }
}

function mapStateToProps(state: any) {
    return {
        visible: state.error.alertOpen,
        errors: state.error.errors,
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        close: () => {
            dispatch(ActionGroup.closeAlertDialog())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AlertDialog)