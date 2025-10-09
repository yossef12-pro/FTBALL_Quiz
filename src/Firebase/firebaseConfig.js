import { initializeApp } from "firebase/app";
import { CACHE_SIZE_UNLIMITED, initializeFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnJvHGacABGXKHHLCQh_kGbP8bZq0JlME",
  authDomain: "footballquiz-2a3df.firebaseapp.com",
  projectId: "footballquiz-2a3df",
  storageBucket: "footballquiz-2a3df.appspot.com",
  messagingSenderId: "649034297407",
  appId: "1:649034297407:web:aba5db20d3b707c3e3488a",
  measurementId: "G-LFCJKZK5JL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore with settings for Hermes engine compatibility
const firestoreInstance = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  useFetchStreams: false,
  cacheSizeBytes: CACHE_SIZE_UNLIMITED
});

// Export the database instance
export const db = firestoreInstance;