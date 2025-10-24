
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDA1w_1Yt4bWmU6bpcK3xMi_aEOcSmqirw",
    authDomain: "tina-portfolio-e5c2d.firebaseapp.com",
    projectId: "tina-portfolio-e5c2d",
    storageBucket: "tina-portfolio-e5c2d.firebasestorage.app",
    messagingSenderId: "440327453325",
    appId: "1:440327453325:web:a6c950e1b46f7dceaa00c4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);