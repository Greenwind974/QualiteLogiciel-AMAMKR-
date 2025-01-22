
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhbUdrkQfyoRGaLtB1RjEk94AhAiBbU2s",
  authDomain: "locamat-f808a.firebaseapp.com",
  projectId: "locamat-f808a",
  storageBucket: "locamat-f808a.firebasestorage.app",
  messagingSenderId: "1065537174705",
  appId: "1:1065537174705:web:d6b640a34cd77b29a37690"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);


export { db, auth }
