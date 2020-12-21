import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyBqV9wuFkPhyx7i70IRiGGas1CjEjBdcN0",
    authDomain: "twitter-clone-32c74.firebaseapp.com",
    databaseURL: "https://twitter-clone-32c74.firebaseio.com",
    projectId: "twitter-clone-32c74",
    storageBucket: "twitter-clone-32c74.appspot.com",
    messagingSenderId: "738745631913",
    appId: "1:738745631913:web:e5a2a17e2d8d62434755b8"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

export const db = firebaseApp.firestore()
export const storage = firebaseApp.storage()
