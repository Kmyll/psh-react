import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import Loader from '../../assets/img/loader/loader2.gif';

class UserList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading : false,
			users   : []
		};
	}

	componentDidMount() {
		this.setState({ loading: true });

		this.unsubscribe = this.props.firebase.users().onSnapshot((snapshot) => {
			let users = [];

			snapshot.forEach((doc) => users.push({ ...doc.data(), uid: doc.id }));

			this.setState({
				users,
				loading : false
			});
		});
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	render() {
		const { users, loading } = this.state;

		return (
			<div>
				{loading && (
					<div className="loaderImg">
						<img src={Loader} />
					</div>
				)}
				<ul className="adminResumeList">
					{users.map((user) => (
						<li key={user.uid}>
							<span>
								<strong>ID :</strong> {user.uid}
							</span>
							<span>
								<strong>E-Mail :</strong> {user.email}
							</span>
							<span>
								<strong>nom :</strong> {user.username}
							</span>
							<span>
								<Link
									to={{
										pathname : `${ROUTES.ADMIN}/${user.uid}`,
										state    : { user }
									}}
								>
									Détails
								</Link>
							</span>
						</li>
					))}
				</ul>
			</div>
		);
	}
}

export default withFirebase(UserList);
