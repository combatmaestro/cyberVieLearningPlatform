// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBV5X8sE5GKGMZDKhAGgxU478RSSV9m31Q",
  authDomain: "fir-2ea7f.firebaseapp.com",
  projectId: "fir-2ea7f",
  storageBucket: "fir-2ea7f.appspot.com",
  messagingSenderId: "170708132937",
  appId: "1:170708132937:web:f4488bf70f10580bba8b98",
  measurementId: "G-3NWHKDHWL1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);