// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDpmv94EfCs_4taaFRxScn2Rf5t9N1mlFU",
  authDomain: "csep.cybervie.com",
  projectId: "csepcybervie",
  storageBucket: "csepcybervie.appspot.com",
  messagingSenderId: "651671438597",
  appId: "1:651671438597:web:8f5d4a456661bf459d236c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);