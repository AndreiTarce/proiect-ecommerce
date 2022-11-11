// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBsT6AGyG8WDemSaBV_y0gE9TokUaZvuhc",
    authDomain: "ecommerce-2416d.firebaseapp.com",
    projectId: "ecommerce-2416d",
    storageBucket: "ecommerce-2416d.appspot.com",
    messagingSenderId: "181531594085",
    appId: "1:181531594085:web:6db3c8c45a328712d4658c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
