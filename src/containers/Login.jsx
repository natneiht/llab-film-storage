import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { db } from '../firebase';
import { filmList } from '../appConstant';
import firebase from 'firebase';
import './css/Login.css';

class Login extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			userRole: -1,
			loggin: false
		};
	}
	componentDidMount() {
		// 	db.collection('TestData')
		// 		.get()
		// 		.then(querySnapshot => {
		// 			const data = querySnapshot.docs.map(doc => doc.data());
		// 			console.log(data);
		// 		});
		// }
		// console.log(filmList);
		// filmList.forEach(item=>{
		// db.collection("FilmList").add(item).then(value=>console.log(value)).catch(err => console.log(err));
		// })
		// console.log(filmList);
	}
	getUserRole = userEmail => {
		// var userRole=0;
		db.collection('UserPermissions').where('userEmail', '==', userEmail).get().then(querySnapshot => {
			querySnapshot.docs.forEach(item => {
				const userRole = item.data().roleLevel;
				console.log('log1', userRole);
				this.setState({ userRole });
			});
		});
	};

	logginAction = () => {
		var user = firebase.auth().currentUser;
		// console.log(user);
		if (!user) {
			let provider = new firebase.auth.GoogleAuthProvider();
			firebase.auth().signInWithPopup(provider);
		}
		else {
			this.props.history.push('./admin');
		}
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				localStorage.setItem('myPage.expectSignIn', '1');
			} else {
				localStorage.removeItem('myPage.expectSignIn');
				// Implement logic to trigger the login dialog here or redirect to sign-in page.
				// e.g. showDialog()
			}
		});
	};

	render() {
		// console.log(this.state);
		var user = firebase.auth().currentUser;
		if (localStorage.getItem('myPage.expectSignIn') !== 1) {
			if (user == null)
				return (
					<div className="container">
						<div id="gSignInWrapper" onClick={() => this.logginAction()}>
							<div class="label">Sign in with:</div>
							<div id="customBtn" class="customGPlusSignIn">
								<span class="icon" />
								<span class="buttonText">Google</span>
							</div>
						</div>
					</div>
				);
		}
		if (user != null) {
			// const role = this.getUserRole(user.email);
			// user.providerData.forEach(function (profile) {
			// //   console.log("Sign-in provider: " + profile.providerId);
			// //   console.log("  Provider-specific UID: " + profile.uid);
			// //   console.log("  Name: " + profile.displayName);
			// //   console.log("  Email: " + profile.email);
			// //   console.log("  Photo URL: " + profile.photoURL);
			// //   console.log("  User role: " + this.state.userRole);
			// 	// console.log(this)
			// });
			if (this.state.userRole == 1) this.props.history.push('./admin');
			console.log('  User role: ' + this.state.userRole);
			return <div style={{ marginTop: '200px' }}>{this.getUserRole(user.email)}</div>;
		}
	}
}

Login.propTypes = {};

export default Login;
