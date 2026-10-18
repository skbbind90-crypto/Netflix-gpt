// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCu22JJ22KyI3sWYD6-E4ly75Vggsk8by0",
  authDomain: "netflixgpt-db5d0.firebaseapp.com",
  projectId: "netflixgpt-db5d0",
  storageBucket: "netflixgpt-db5d0.firebasestorage.app",
  messagingSenderId: "386831265652",
  appId: "1:386831265652:web:cc221e14dfcf32f2aa8621",
  measurementId: "G-XJY480Y2BS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);