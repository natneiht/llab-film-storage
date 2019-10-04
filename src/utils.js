import firebase from 'firebase';
export function isLogin() {
	// let user = firebase.auth().currentUser;
	// if(user) return 1;
	// if(!user) return 0;
	const loginStatus = localStorage.getItem('loginStatus');
	console.log(loginStatus);
	if (loginStatus == null || loginStatus == 0) return false;
	if (loginStatus == 1) return true;
}

export function generateNewID () {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();
    const randonNumber= Math.floor(Math.random()*999);
    return `p${yyyy}${mm}${dd}${randonNumber}`;
    
}
