import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDSE3wbk-bbR6X_sZbGk3nqOT8KKavp5wE",
  authDomain: "armair-7e8b8.firebaseapp.com",
  projectId: "armair-7e8b8",
  storageBucket: "armair-7e8b8.appspot.com",
  messagingSenderId: "255019274248",
  appId: "1:255019274248:web:00b7a292cfd581b1b801bd",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export default app;
