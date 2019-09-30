import firebase from 'firebase';
export function isLogin() {
    let user = firebase.auth().currentUser;
    if(user) return 1;
    if(!user) return 0;
}