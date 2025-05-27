import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-5mPLCV4ix1vrfzTiOuAeQca_xf-REWA",
  authDomain: "miniblog-1664c.firebaseapp.com",
  projectId: "miniblog-1664c",
  storageBucket: "miniblog-1664c.firebasestorage.app",
  messagingSenderId: "693180593966",
  appId: "1:693180593966:web:d7be4991685a86b58eecbf",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db }; // Export the Firestore database instance
