import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDaAuvdqP3SUQOBf41pO6XyUX_y5YkKuLg",
  authDomain: "agila-projektmetoder.firebaseapp.com",
  projectId: "agila-projektmetoder",
  storageBucket: "agila-projektmetoder.appspot.com",
  messagingSenderId: "991987437258",
  appId: "1:991987437258:web:307dbdb3edcebbce77ae33"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const storage = getStorage(app)