import * as React from 'react';
import Button from '@material-ui/core/Button';
<<<<<<< HEAD
import * as ActionGroup from '../actions';
=======
import * as ActionGroup from '../ducks/UserManagement';
>>>>>>> 5b19420d784c2895a7cc7bcc6bbca1a96f642ef6
import { connect } from 'react-redux';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import { Input } from '@progress/kendo-react-inputs';
import { User }from '../types'
import { compare } from 'fast-json-patch';

function formInvalid(password: string, confirm :string): boolean {
	const mismatch: boolean = password !== confirm;
	const invalidLength: boolean = password.length <= 6 || password.length >= 18;
<<<<<<< HEAD
	/** Use Joi Later for regex */
=======
>>>>>>> 5b19420d784c2895a7cc7bcc6bbca1a96f642ef6
	return mismatch || invalidLength;
}

const PasswordForm = (props: any) => {
	const {
		inEdit,
		newVal,
<<<<<<< HEAD
=======
		origVal,
>>>>>>> 5b19420d784c2895a7cc7bcc6bbca1a96f642ef6
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
<<<<<<< HEAD
=======
					// onChange={(e: any) => setUser({...user, password: e.value})}
>>>>>>> 5b19420d784c2895a7cc7bcc6bbca1a96f642ef6
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
<<<<<<< HEAD
		onClick={() => onPasswordSubmit({ id: inEdit, password: confirm })} 
			
			// userId: inEdit,
			// patch: compare(	{ password: origVal },
			// 				{ password: confirm })
			// })}
=======
		onClick={() => onPasswordSubmit({
			userId: inEdit,
			patch: compare(	{ password: origVal },
							{ password: confirm })
			})}
>>>>>>> 5b19420d784c2895a7cc7bcc6bbca1a96f642ef6
		disabled={formInvalid(password, confirm)}>
			Submit
		</Button>
		</DialogActionsBar>
		</React.Fragment>
	)
}
<<<<<<< HEAD

class PasswordModal extends React.Component <any, {}>{
	public render() {
		const {
			inCreateMode,
			updatePassword,
			createPassword,
			togglePasswordModal,
			showPasswordModal,
			inEdit } = this.props
=======
class PasswordModal extends React.Component <any, {}>{
	public render() {
		const {
			onPasswordSubmit,
			togglePasswordModal,
			showPasswordModal,
			userInEdit } = this.props
>>>>>>> 5b19420d784c2895a7cc7bcc6bbca1a96f642ef6
	return (
		<React.Fragment>
		{ showPasswordModal && 
			<Dialog 
				title="Change Password"
				onClose={togglePasswordModal}>
			<PasswordForm
<<<<<<< HEAD
				inEdit={inEdit}
				onPasswordSubmit={inCreateMode ? createPassword : updatePassword} 
=======
				inEdit={userInEdit[0].id}
				onPasswordSubmit={onPasswordSubmit} 
				origVal={userInEdit[0].password} 
>>>>>>> 5b19420d784c2895a7cc7bcc6bbca1a96f642ef6
				newVal="" />
		</Dialog>}
		</React.Fragment>
		)
	}
}

const mapStateToProps = (state: any) => {
    return {
<<<<<<< HEAD
		inCreateMode: state.editor.inCreateMode,
		inEdit: state.editor.inEdit,
=======
		userInEdit: state.editor.userInEdit,
>>>>>>> 5b19420d784c2895a7cc7bcc6bbca1a96f642ef6
		showPasswordModal: state.ui.showPasswordModal,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
<<<<<<< HEAD
		updatePassword: (update: any) => {
            dispatch(ActionGroup.changeUserPassword(update));
		},
		createPassword: (created: any) => {
			dispatch(ActionGroup.changeUserData(created.id, 'password', created.password))
=======
        onPasswordSubmit: (patch: any) => {
            dispatch(ActionGroup.changeUserPassword(patch))
>>>>>>> 5b19420d784c2895a7cc7bcc6bbca1a96f642ef6
		},
		togglePasswordModal: () => {
			dispatch(ActionGroup.togglePasswordModal())
		}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PasswordModal)