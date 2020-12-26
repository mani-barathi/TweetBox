import firebase from "firebase"

const firebaseConfig = {
    // replace project keys here
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

export const db = firebaseApp.firestore()
export const storage = firebaseApp.storage()
export const auth = firebaseApp.auth()
export const provider = new firebase.auth.GoogleAuthProvider();
