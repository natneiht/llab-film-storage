import firebase from 'firebase';
export function isLogin() {
    // let user = firebase.auth().currentUser;
    // if(user) return 1;
    // if(!user) return 0;
    const loginStatus = JSON.parse(localStorage.getItem('loginStatus'));
    console.log(loginStatus);
    if(loginStatus==null) return false;
    if(loginStatus!==null) {
        if(loginStatus.status == "true") return true;
    }
}