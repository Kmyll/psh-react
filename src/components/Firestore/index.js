import firebase from 'firebase';
import 'firebase/storage';

const config = {
	apiKey            : process.env.REACT_APP_API_KEY,
	authDomain        : process.env.REACT_APP_AUTH_DOMAIN,
	databaseURL       : process.env.REACT_APP_DATABASE_URL,
	projectId         : process.env.REACT_APP_PROJECT_ID,
	storageBucket     : process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId : process.env.REACT_APP_MESSAGING_SENDER_ID
};

firebase.initializeApp(config);
const storage = firebase.storage();

export { storage, firebase as default };
