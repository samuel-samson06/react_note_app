import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCxhi0ymX3LQbU0m1mqEQ8WUZHEsHUHXfY",
  authDomain: "got-notes.firebaseapp.com",
  projectId: "got-notes",
  storageBucket: "got-notes.appspot.com",
  messagingSenderId: "376730265221",
  appId: "1:376730265221:web:fdb9562016281a2a26abec",
  measurementId: "G-ET6XVP23CC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const provider = new GoogleAuthProvider();
export const db=getFirestore(app)