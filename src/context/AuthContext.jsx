import { createContext, useEffect, useState, useContext } from "react"; // Import useContext
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { auth, firestore } from "../firebase";

import { onAuthStateChanged } from "firebase/auth";
const UserContext = createContext();

export const AuthContextprovider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [copArray, setCopArray] = useState([]);
  const [branchArray, setBranchArray] = useState([]);
  const [copObj, setCopObj] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        const unsub = onSnapshot(
          doc(firestore, "user", user.uid),
          (doc) => {
            setUserData({ ...doc.data(), id: uid }); // Update userData state
            setLoading(false);
          },
          (error) => {
            setError(true);
            setLoading(false);
          }
        );
      } else {
        setLoading(false);
        setUserData(null);
      }
    });
  }, []);

  useEffect(() => {
    if (userData) {
      const unsub = onSnapshot(doc(firestore, "data", "coporate"), (doc) => {
        if (doc.exists()) {
          const arrayData = Object.keys(doc.data().coporate).map((key) => {
            const cop_id = key;
            const data = doc.data().coporate[key];
            return { cop_id, ...data };
          });
          setCopArray(arrayData);
          setCopObj(doc.data().coporate);
        } else {
          setCopArray([]);
          setCopObj({});
        }
      });

      return () => {
        unsub();
      };
    }
  }, [userData]);

  useEffect(() => {
    if (userData) {
      if (userData.job_role === "admin") {
        const getBranch = async () => {
          const userRef = collection(getFirestore(), "user");
          const q = query(userRef, where("job_role", "==", "branch"));
          const querySnapshot = await getDocs(q);
          const branchArray = [];
          querySnapshot.forEach((doc) => {
            branchArray.push({ id: doc.id, ...doc.data() });
          });
          setBranchArray(branchArray);
        };
        getBranch();
      }
    }
  }, [userData]);

  return (
    <UserContext.Provider
      value={{ userData, loading, error, copArray, copObj, branchArray }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext); // Use useContext to consume the context
};
