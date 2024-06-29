import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAtrx9-neFGp079GfuGmYMAv-5wPLw6ZmI",
  authDomain: "condominio-app-d993e.firebaseapp.com",
  projectId: "condominio-app-d993e",
  storageBucket: "condominio-app-d993e.appspot.com",
  messagingSenderId: "1036986644710",
  appId: "1:1036986644710:web:4b8dfd506c550ae61e2327",
  measurementId: "G-8XM3GD57MJ",
};

const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const firestore = getFirestore(app);
const db = getFirestore(app);

export { auth, firestore, app, db };
