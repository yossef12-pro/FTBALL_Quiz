// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDxSkpICYh9dxbZddfpKGB1p0a85MNkKjo",
  authDomain: "footballquiz-2a3df.firebaseapp.com",
  projectId: "footballquiz-2a3df",
  storageBucket: "footballquiz-2a3df.firebasestorage.app",
  messagingSenderId: "649034297407",
  appId: "1:649034297407:web:aba5db20d3b707c3e3488a",
  measurementId: "G-P1TJ97G2N2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export{
  db
}