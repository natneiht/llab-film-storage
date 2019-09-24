import { db } from './firebase';

export function getFilmList() {
	db.collection('FilmList')
		.get()
		.then(querySnapshot => {
			const data = querySnapshot.docs.map(doc => ({ id: doc.id, data: doc.data() }));
            return data
        })
        .catch(error => console.log(error));
}

export function getUserRole(userEmail) {
	var userRole = -1;
	db.collection("UserPermissions").where("userEmail", "==", userEmail).get()
	.then(querySnapshot => {
		querySnapshot.docs.forEach(item => {
			userRole=item.data().roleLevel;
			console.log('log1', userRole)
			// this.setState({userRole});
		});
	});
	console.log('log2', userRole)
	return userRole;
}