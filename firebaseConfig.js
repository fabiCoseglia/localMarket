// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHnhUqkDTHhQJLoXVTvHSSaCBWxYqeBTk",
  authDomain: "local-ecommerce-e48a7.firebaseapp.com",
  projectId: "local-ecommerce-e48a7",
  storageBucket: "local-ecommerce-e48a7.appspot.com",
  messagingSenderId: "858703837942",
  appId: "1:858703837942:web:6495d30e3c8a64d3698ad7",
  measurementId: "G-XB3XHXKHK6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
