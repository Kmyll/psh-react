import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import Loader from '../../assets/img/loader/loader2.gif';

class JobList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading  : false,
			annonces : []
		};
	}

	componentDidMount() {
		this.setState({ loading: true });

		this.props.firebase.annonces().onSnapshot((snapshot) => {
			let annonces = [];

			snapshot.forEach((doc) => annonces.push({ ...doc.data(), uid: doc.id }));

			this.setState({
				annonces,
				loading  : false
			});
		});
	}

	render() {
		const { annonces, loading } = this.state;

		return (
			<div>
				<h1>Liste des offres, emplois et stages</h1>
				{loading && (
					<div className="loaderImg">
						<img src={Loader} />
					</div>
				)}
				<ul className="adminUsersList">
					{annonces.map((annonce) => (
						<li key={annonce.uid}>
							{/* <span>
								<strong>ID :</strong> {annonce.uid}
							</span> */}
							<span>
								<strong>Intitulé de l'annonce :</strong> {annonce.name}
							</span>
							<span>
								<strong>Type de contrat:</strong> {annonce.contrat}
							</span>
							<span>
								<strong>lieu :</strong> {annonce.place}
							</span>
							<span>
								<Link
									to={{
										pathname : `${ROUTES.JOBS}/${annonce.uid}`,
										state    : { annonce }
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

export default withFirebase(JobList);
