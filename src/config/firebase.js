// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAe00dISmaBz_6_lixsiQtEuZQKOVfyPxo",
  authDomain: "aiedulawchatbot.firebaseapp.com",
  projectId: "aiedulawchatbot",
  storageBucket: "aiedulawchatbot.firebasestorage.app",
  messagingSenderId: "781017936124",
  appId: "1:781017936124:web:5af2267f41a1a0446a2779",
  measurementId: "G-0TS24V0KDK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
