// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from  "firebase/database"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC9j2dc-BEdTrPVdscXWyIy01cEwpVGPt0",
  authDomain: "game-eb7be.firebaseapp.com",
  databaseURL: "https://game-eb7be-default-rtdb.firebaseio.com",
  projectId: "game-eb7be",
  storageBucket: "game-eb7be.appspot.com",
  messagingSenderId: "275960005724",
  appId: "1:275960005724:web:d98c16224a1c4a627e5299",
  measurementId: "G-KTF5QTK0EE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getDatabase(app);
