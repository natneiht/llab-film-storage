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
