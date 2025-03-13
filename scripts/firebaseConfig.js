// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// const firebaseConfig = {
//   apiKey: "AIzaSyAxDvkm9Vzqwel4mAc9DfBBR0_U-rJZiBk",
//   authDomain: "smartwaste-54ef4.firebaseapp.com",
//   projectId: "smartwaste-54ef4",
//   storageBucket: "smartwaste-54ef4.firebasestorage.app",
//   messagingSenderId: "290747380125",
//   appId: "1:290747380125:web:11a530e66849effa523f74",
//   measurementId: "G-PVPMS0PLJ1"
// };

// // Initialize Firebase
// export const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);

import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';

// Initialize Firebase
const firebaseConfig = {
       apiKey: "AIzaSyAxDvkm9Vzqwel4mAc9DfBBR0_U-rJZiBk",
       authDomain: "smartwaste-54ef4.firebaseapp.com",
       projectId: "smartwaste-54ef4",
       storageBucket: "smartwaste-54ef4.firebasestorage.app",
       messagingSenderId: "290747380125",
       appId: "1:290747380125:web:11a530e66849effa523f74",
       measurementId: "G-PVPMS0PLJ1"
};

const app = initializeApp(firebaseConfig);

// Check if IndexedDB is supported before initializing Analytics
isSupported().then((supported) => {
  if (supported) {
    const analytics = getAnalytics(app);
    console.log("Analytics initialized");
  } else {
    console.log("Analytics not supported in this environment");
  }
});
