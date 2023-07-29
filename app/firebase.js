// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGlftk0fSboqJTa4lcQvxWdNOD70J71qg",
  authDomain: "spendwise-910eb.firebaseapp.com",
  projectId: "spendwise-910eb",
  storageBucket: "spendwise-910eb.appspot.com",
  messagingSenderId: "547519798225",
  appId: "1:547519798225:web:e889968e11e12859ea9ef0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);