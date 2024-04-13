// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDE_xeq4-ug9kBadi0fHvPgr_JpHnn3mlI",
  authDomain: "material-list-react-fire-4c5ba.firebaseapp.com",
  projectId: "material-list-react-fire-4c5ba",
  storageBucket: "material-list-react-fire-4c5ba.appspot.com",
  messagingSenderId: "76248828946",
  appId: "1:76248828946:web:9e7b04906a8a6694e89ccb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };
