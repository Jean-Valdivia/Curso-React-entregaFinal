import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import products from './mocks/products.json'
import './index.css'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCjgQUUODOSzOCtCe7NA9E1f8q9c0B77aE",
  authDomain: "fenix3d-ae9d6.firebaseapp.com",
  projectId: "fenix3d-ae9d6",
  storageBucket: "fenix3d-ae9d6.appspot.com",
  messagingSenderId: "925732073920",
  appId: "1:925732073920:web:ed5bb12d224a34867d9825",
  measurementId: "G-MTKW6E56KG"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

/* const db = getFirestore(app);

products.forEach((product)=>{
  addDoc(collection(db, 'products'), product)
  .then((docRef => {
    console.log('documento agregado con id:', docRef.id)
  }))
  .catch((error) =>{
    console.log("error:", error)
  })
}) */

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
