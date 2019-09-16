import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { db } from '../firebase';
import { filmList } from '../appConstant';

class Login extends PureComponent {
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

	render() {
		return <div></div>;
	}
}

Login.propTypes = {};

export default Login;
