import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { compose } from 'recompose';
import { Link } from 'react-router-dom';
import { GrUserSettings } from 'react-icons/gr';
import { BiLogInCircle } from 'react-icons/bi';
import { BsCardChecklist } from 'react-icons/bs';
import { MdComputer, MdEventNote } from 'react-icons/md';
import { GiLetterBomb } from 'react-icons/gi';
import { SiGooglehangoutsmeet } from 'react-icons/si';

import { withAuthorization, withEmailVerification } from '../Session';
import { UserList, UserItem } from '../Users';
import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';
import Admin from '../../assets/img/admin.png';

const AdminPage = () => (
	<div className="container">
		<h1>Interface administrateur</h1>
		<section className="adminList">
			<Link to={ROUTES.ADMIN}>
				<GrUserSettings /> <span>Utilisateurs</span>
			</Link>
			<Link to={ROUTES.SIGN_UP}>
				<BiLogInCircle /> <span>Inscriptions</span>
			</Link>
			<Link to={ROUTES.RESUME}>
				<BsCardChecklist /> <span>liste des CV</span>
			</Link>
			<Link to={ROUTES.JOBINTERFACE}>
				<MdComputer /> <span>Gérer les offre d'emploi</span>
			</Link>
			<Link to={ROUTES.PUBLISHNEWSLETTER}>
				<GiLetterBomb /> <span>Publier une newsletter</span>
			</Link>
			<Link to={ROUTES.EVENTSMANAGEMENT}>
				<MdEventNote /> <span>Gérer les evénements</span>
			</Link>
			<Link to={ROUTES.POSTAG}>
				<SiGooglehangoutsmeet /> <span>Poster un compte rendu d'AG</span>
			</Link>
			<Link to="#" />
		</section>
		<img className="adminPicture" src={Admin} />
	</div>
);

const condition = (authUser) => authUser && !!authUser.roles[ROLES.ADMIN];

export default compose(withEmailVerification, withAuthorization(condition))(AdminPage);
