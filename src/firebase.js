import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyB_FHVhK2MykSnDA0rU6-eeCmzm7VtWJnU",
  authDomain: "blue-82b23.firebaseapp.com",
  projectId: "blue-82b23",
  storageBucket: "blue-82b23.appspot.com",
  messagingSenderId: "308155436293",
  appId: "1:308155436293:web:72a0d43e8cd7e9cb8d3b6c",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export default app;
