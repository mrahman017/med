// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpX0wuVdP5oZ0Dnq5AxfD9lovkfmLvlRI",
  authDomain: "medalert-5b16a.firebaseapp.com",
  projectId: "medalert-5b16a",
  storageBucket: "medalert-5b16a.appspot.com",
  messagingSenderId: "76788281757",
  appId: "1:76788281757:web:f43c050246d9a8aa41ff74",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const db = getFirestore(app);
