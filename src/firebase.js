import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDqLPRVkxJfnMeRWXzsKpQPPyo1sfKH_8A",
    authDomain: "llab-firebase.firebaseapp.com",
    databaseURL: "https://llab-firebase.firebaseio.com",
    projectId: "llab-firebase",
    storageBucket: "llab-firebase.appspot.com",
    messagingSenderId: "382371370985",
    appId: "1:382371370985:web:7ac87948ac1dc90beedd78"
});

const db = firebaseApp.firestore();

export { db };