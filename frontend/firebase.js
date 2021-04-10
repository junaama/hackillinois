import firebase from 'firebase';
import 'firebase/auth'

const firebaseConfig = {
    apiKey: process.env.FIREBASE_APIKEY,
    authDomain: process.env.FIREBASE_AUTHDOMAIN,
    projectId: process.env.FIREBASE_PROJECTID,
    storageBucket: process.env.FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
    appId: process.env.FIREBASE_APPID,
    databaseURL: process.env.FIREBASE_DATABASEURL
}

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const db = fireabseApp.firestore();

if(!firebase.apps.length){
    firebase.initializeApp(config)
}

export default firebase