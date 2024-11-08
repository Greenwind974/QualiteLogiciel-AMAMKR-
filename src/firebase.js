// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAg3jKy0cLTHdcg-7oXNszIBTk7aolve-c",
  authDomain: "projet-test-94bb1.firebaseapp.com",
  projectId: "projet-test-94bb1",
  storageBucket: "projet-test-94bb1.firebasestorage.app",
  messagingSenderId: "295491745359",
  appId: "1:295491745359:web:8954fbc732786cc2549c3a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth }
