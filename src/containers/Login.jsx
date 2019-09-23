import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { db } from '../firebase';
import { filmList } from '../appConstant';
import firebase from "firebase";

class Login extends PureComponent {
	constructor(props){
		super(props);
		this.state = {
			loggin: false,
		}
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

	logginAction = () => {
		var user = firebase.auth().currentUser;
		console.log(user);
		if(!user){
			let provider = new firebase.auth.GoogleAuthProvider();
			firebase.auth().signInWithPopup(provider);
		}
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
			  localStorage.setItem('myPage.expectSignIn', '1')
			} else {
			  localStorage.removeItem('myPage.expectSignIn')
			  // Implement logic to trigger the login dialog here or redirect to sign-in page.
			  // e.g. showDialog()
			}
		  })
	}

	render() {
		var user = firebase.auth().currentUser;
		if (user != null) {
			user.providerData.forEach(function (profile) {
			  console.log("Sign-in provider: " + profile.providerId);
			  console.log("  Provider-specific UID: " + profile.uid);
			  console.log("  Name: " + profile.displayName);
			  console.log("  Email: " + profile.email);
			  console.log("  Photo URL: " + profile.photoURL);
			});
		  }
		return <button style={{marginTop: "200px"}} onClick={() => this.logginAction()}>Login</button>;
	}
}

Login.propTypes = {};

export default Login;
