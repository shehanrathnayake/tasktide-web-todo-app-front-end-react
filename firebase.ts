// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBZtujeZsceNm9C_kSAPZpgE0G_6V_pu5w",
    authDomain: "to-do-app-13ecd.firebaseapp.com",
    projectId: "to-do-app-13ecd",
    storageBucket: "to-do-app-13ecd.appspot.com",
    messagingSenderId: "819202634080",
    appId: "1:819202634080:web:8107dff44ac9cc00f62e05"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export {app, auth}