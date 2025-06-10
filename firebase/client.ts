// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAhZREGGf1ZJwi6DnFzZL4uMwrjbPRMj-M",
  authDomain: "prepwise-a60bc.firebaseapp.com",
  projectId: "prepwise-a60bc",
  storageBucket: "prepwise-a60bc.firebasestorage.app",
  messagingSenderId: "920177762647",
  appId: "1:920177762647:web:103f959e86716b3d5b5e12",
  measurementId: "G-ERB85E85KS"
};
// (COPIED FROM firebase ->  web </>) and edited also myself yesterday
// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);