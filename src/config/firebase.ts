// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {GoogleAuthProvider,getAuth,EmailAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBG1yQ69e8L4G3EFY6aQkWbiYlWO6QOH44",
  authDomain: "newreact-cf95d.firebaseapp.com",
  projectId: "newreact-cf95d",
  storageBucket: "newreact-cf95d.appspot.com",
  messagingSenderId: "197513313456",
  appId: "1:197513313456:web:685f2d269f921be16bcf75",
  measurementId: "G-BY053XLD1V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider
export const db = getFirestore(app)
export const emailProvider = new EmailAuthProvider