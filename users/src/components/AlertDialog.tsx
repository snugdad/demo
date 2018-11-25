import React from 'react';

import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';

export default class extends React.Component <any, {}> {
    render () {
    const { visible, title, hideAlertDialog } = this.props
        return (
            <React.Fragment>
                {visible && <Dialog title={title} onClose={hideAlertDialog}>
                    <p style={{ margin: "25px", textAlign: "center" }}>Are you sure you want to continue?</p>
                    <DialogActionsBar>
                        <button className="k-button" onClick={hideAlertDialog}>No</button>
                        <button className="k-button" onClick={dialogAction}>Yes</button>
                    </DialogActionsBar>
                </Dialog>}
            </React.Fragment>
        );
    }
}

function mapStateToProps (state: any){
    return {
        state.alertDialog
    }
}