// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAChsKU7AJIeBeEKTiAo0LL5PtaB40GKt0",
  authDomain: "noteproject-83467.firebaseapp.com",
  projectId: "noteproject-83467",
  storageBucket: "noteproject-83467.appspot.com",
  messagingSenderId: "46089819990",
  appId: "1:46089819990:web:bc4caedf3a4acdc08928f7",
  measurementId: "G-86CR2XGZHN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
