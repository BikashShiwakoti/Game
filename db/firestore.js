import * as firebase from 'firebase';

import "firebase/firestore";

const configuration = {
    apiKey: "AIzaSyDeUpGwHxJpx8W8BFmNa5PFmLcPfGeXkQ4",
    authDomain: "mathgameapp-b876a.firebaseapp.com",
    projectId: "mathgameapp-b876a",
    storageBucket: "mathgameapp-b876a.appspot.com",
    messagingSenderId: "140856332021",
    appId: "1:140856332021:web:b7f30bcb25ad48d19dbfbc",
    measurementId: "G-B04680R04W"
};

firebase.initializeApp(configuration);

const db = firebase.firestore();

export default db;