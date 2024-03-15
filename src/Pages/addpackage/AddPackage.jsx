import React, { useEffect } from "react";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { firestore } from "../../firebase";
import { UserAuth } from "../../context/AuthContext";
import TabContainer from "./TabContainer";

export default function AddPackage() {
  return (
    <div className="">
      <TabContainer />
    </div>
  );
}
