import * as React from 'react';
import Button from '@material-ui/core/Button';
import * as ActionGroup from '../ducks/UserManagement';
import { connect } from 'react-redux';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import { Input } from '@progress/kendo-react-inputs';
import { User }from '../types'
import { compare } from 'fast-json-patch';

function formInvalid(password: string, confirm :string): boolean {
	const mismatch: boolean = password !== confirm;
	const invalidLength: boolean = password.length <= 6 || password.length >= 18;
	return mismatch || invalidLength;
}

const PasswordForm = (props: any) => {
	const {
		inEdit,
		newVal,
		origVal,
		onPasswordSubmit } = props;
	
	const [password, setPassword] = React.useState(newVal);
	const [confirm, setConfirm] = React.useState("");
	return (
		<React.Fragment>
		<form >
			<div style={{ marginBottom: '1rem' }}>
			<label>
				New Password<br />
				<Input
                    name="password"
					type="password"
					style={{ width: '100%' }}
					value={password}
					onChange={(e: any) => setPassword(e.value)}
					// onChange={(e: any) => setUser({...user, password: e.value})}
                    label="Password"
                    required={true}
                    minLength={6}
                    maxLength={18}/>
			</label>
			<br />
			<label>
				Confirm Password <br />
				<Input
                    name="password"
					type="password"
					style={{ width: '100%' }}
					onChange={(e: any) => setConfirm(e.value)}
					value={confirm}
                    label="Password"
                    required={true}
                    minLength={6}
                    maxLength={18}/>	
			</label>
			</div>
		</form>
		<DialogActionsBar>
		<Button
		onClick={() => onPasswordSubmit({
			userId: inEdit,
			patch: compare(	{ password: origVal },
							{ password: confirm })
			})}
		disabled={formInvalid(password, confirm)}>
			Submit
		</Button>
		</DialogActionsBar>
		</React.Fragment>
	)
}
class PasswordModal extends React.Component <any, {}>{
	public render() {
		const {
			onPasswordSubmit,
			togglePasswordModal,
			showPasswordModal,
			userInEdit } = this.props
	return (
		<React.Fragment>
		{ showPasswordModal && 
			<Dialog 
				title="Change Password"
				onClose={togglePasswordModal}>
			<PasswordForm
				inEdit={userInEdit[0].id}
				onPasswordSubmit={onPasswordSubmit} 
				origVal={userInEdit[0].password} 
				newVal="" />
		</Dialog>}
		</React.Fragment>
		)
	}
}

const mapStateToProps = (state: any) => {
    return {
		userInEdit: state.editor.userInEdit,
		showPasswordModal: state.ui.showPasswordModal,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        onPasswordSubmit: (patch: any) => {
            dispatch(ActionGroup.changeUserPassword(patch))
		},
		togglePasswordModal: () => {
			dispatch(ActionGroup.togglePasswordModal())
		}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PasswordModal)