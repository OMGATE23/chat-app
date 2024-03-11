// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDauEjGGo0xL3vbNbBWohoLoBIRjnRYOAI",
  authDomain: "breakfree-c270a.firebaseapp.com",
  databaseURL:
    "https://breakfree-c270a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "breakfree-c270a",
  storageBucket: "breakfree-c270a.appspot.com",
  messagingSenderId: "967480669199",
  appId: "1:967480669199:web:a4406a5d9a207f04f65f7a",
  measurementId: "G-B45ZYD8ZSH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
