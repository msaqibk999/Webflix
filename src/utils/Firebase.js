// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8HWCmu8zlISvChEnGr_jXmEiosNTH0Yc",
  authDomain: "webflix-af06e.firebaseapp.com",
  projectId: "webflix-af06e",
  storageBucket: "webflix-af06e.appspot.com",
  messagingSenderId: "339107483411",
  appId: "1:339107483411:web:ff946548cce940ed16d4e6",
  measurementId: "G-6VFL1YTZXH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();