import React from 'react';
<<<<<<< HEAD
import * as ActionGroup from '../actions'
import { Dialog } from '@progress/kendo-react-dialogs';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core'

=======
import * as ActionGroup from '../ducks/UserManagement'
import { Dialog } from '@progress/kendo-react-dialogs';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core'
import { ui } from '../ducks';
>>>>>>> 5b19420d784c2895a7cc7bcc6bbca1a96f642ef6
const styles = ({
    typeography: {

    } 
})

class AlertDialog extends React.Component <any, {}> {
    render () {
    const { visible, errors, close} = this.props
        return (
            <React.Fragment>
                {visible && errors.length > 0 && 
                <Dialog title={"Network Error"} onClose={close}>
                <p>Error: {errors[0].message}</p>

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