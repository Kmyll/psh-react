import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import TextField from '@material-ui/core/TextField';

const PasswordForgetPage = () => (
	<div className="signIn">
		<section className="pw-forgot">
			<h1>Mot de passe oublié ?</h1>
			<PasswordForgetForm />
		</section>
	</div>
);

const INITIAL_STATE = {
	email : '',
	error : null
};

class PasswordForgetFormBase extends Component {
	constructor(props) {
		super(props);

		this.state = { ...INITIAL_STATE };
	}

	onSubmit = (event) => {
		const { email } = this.state;

		this.props.firebase
			.doPasswordReset(email)
			.then(() => {
				this.setState({ ...INITIAL_STATE });
			})
			.catch((error) => {
				this.setState({ error });
			});

		event.preventDefault();
	};

	onChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};

	render() {
		const { email, error } = this.state;

		const isInvalid = email === '';

		return (
			<form onSubmit={this.onSubmit} className="signInForm">
				<TextField
					id="outlined-basic"
					label="Adresse email"
					variant="outlined"
					name="email"
					value={this.state.email}
					onChange={this.onChange}
					type="text"
				/>

				<button disabled={isInvalid} type="submit">
					Réinitialiser mon mot de passe
				</button>

				{error && <p>{error.message}</p>}
			</form>
		);
	}
}

const PasswordForgetLink = () => (
	<p className="forgotPasswordLink">
		<Link to={ROUTES.PASSWORD_FORGET}>Mot de passe oublié ?</Link>
	</p>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };
