import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDtt9GqxzCJB5M5q26BSxBF40UuPeL_i5o",
  authDomain: "todo-b0a70.firebaseapp.com",
  projectId: "todo-b0a70",
  storageBucket: "todo-b0a70.firebasestorage.app",
  messagingSenderId: "363535859591",
  appId: "1:363535859591:web:8a6a0405fe668bc9575d22",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
