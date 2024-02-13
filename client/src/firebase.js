
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBpaiItzGAu033ONSHUIb2zHl0QFc_25Bw",
  authDomain: "estate-8ca2a.firebaseapp.com",
  projectId: "estate-8ca2a",
  storageBucket: "estate-8ca2a.appspot.com",
  messagingSenderId: "588732069998",
  appId: "1:588732069998:web:ca4908db58cf994e35ce7f",
  measurementId: "G-33N83JH4V0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
