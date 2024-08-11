import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseApiKey = process.env.FIREBASE_API_KEY;

// Firebase configuration
const firebaseConfig = {
    apiKey: firebaseApiKey,
    authDomain: "aicustomersupport-514bd.firebaseapp.com",
    projectId: "aicustomersupport-514bd",
    storageBucket: "aicustomersupport-514bd.appspot.com",
    messagingSenderId: "599747353828",
    appId: "1:599747353828:web:1a0f18d90970b04b53e0f1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

// Authentication
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, googleProvider, firestore };