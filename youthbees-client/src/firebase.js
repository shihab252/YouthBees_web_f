import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // ✅ ADD THIS

const firebaseConfig = {
  apiKey: "AIzaSyDLQYE1_Liz2xAU2etEYsYRUxPTsFqPvRE",
  authDomain: "youthbees.firebaseapp.com",
  projectId: "youthbees",
  storageBucket: "youthbees.firebasestorage.app",
  messagingSenderId: "347530475388",
  appId: "1:347530475388:web:ad302196b173767f0516f9",
  measurementId: "G-T1X98HFCS9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ THIS NOW WORKS
export const auth = getAuth(app);