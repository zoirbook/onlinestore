import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA1pD1_OXbGASQcqfBCD-6LUs0qT7FUd4g",
  authDomain: "onlinestore-f466a.firebaseapp.com",
  projectId: "onlinestore-f466a",
  storageBucket: "onlinestore-f466a.appspot.com",
  messagingSenderId: "1054491582629",
  appId: "1:1054491582629:web:bc503e6b2b16632953ed4c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
