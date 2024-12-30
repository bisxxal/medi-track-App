// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,getReactNativePersistence, initializeAuth}  from "firebase/auth"; 
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAOrBhygI8sZKHnoL35n8xCc5pYfHMhJlc",
  authDomain: "meditracker-911ae.firebaseapp.com",
  projectId: "meditracker-911ae",
  storageBucket: "meditracker-911ae.firebasestorage.app",
  messagingSenderId: "659194383852",
  appId: "1:659194383852:web:2470ba75bd43bed7cdc4c9",
  measurementId: "G-FLYBGZTJFC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
export const auth = initializeAuth(app,{
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export const db= getFirestore(app);