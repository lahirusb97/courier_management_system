"use client";
import React, { useEffect, useRef, useState } from "react";
import CameraOpen from "../../Components/scanoptions/CameraOpen";
import { useSymbologyScanner } from "@use-symbology-scanner/react";
import PackageView from "./PackageView";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { openScackbar } from "../../Redux/Slice/snackBarSlice";
import { CircularProgress, TextField, Typography } from "@mui/material";
import { RiFilePaper2Line } from "react-icons/ri";
export default function ScanPackage() {
  const [package_ID, setPackage_ID] = React.useState("");
  const [loading, setloading] = React.useState(false);
  const [packageDetail, setpackageDetail] = React.useState(null);
  const dispatch = useDispatch();
  const getPackageID = (id) => {
    setPackage_ID(id);
  };
  const ref = useRef(null);

  const handleSymbol = (symbol, matchedSymbologies) => {
    setPackage_ID(symbol);
  };
  useSymbologyScanner(handleSymbol, { target: ref });
  useEffect(() => {
    const getData = async () => {
      try {
        setloading(true);
        const docRef = doc(getFirestore(), "package", package_ID);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setpackageDetail({ ...docSnap.data(), package_id: docSnap.id });
          setloading(false);
          dispatch(
            openScackbar({ open: true, type: "success", msg: "success" })
          );
        } else {
          setpackageDetail(null);
          setloading(false);
          dispatch(
            openScackbar({
              open: true,
              type: "error",
              msg: "Package not found",
            })
          );
        }
      } catch (err) {
        setloading(false);
        dispatch(openScackbar({ open: true, type: "error", msg: err.message }));
      }
    };

    if (package_ID) {
      getData();
    }
  }, [package_ID]);

  return (
    <div>
      <CameraOpen getPackageID={getPackageID} />

      <div ref={ref}></div>
      <div>
        {!loading ? (
          packageDetail !== null ? (
            <PackageView packageDetail={packageDetail} />
          ) : (
            <div className="flex justify-center items-center">
              <div className="flex flex-col justify-center items-center">
                <Typography variant="h6" color="textSecondary" fontWeight={600}>
                  No Item Data
                </Typography>
                <RiFilePaper2Line size={100} color="gray" />
              </div>
            </div>
          )
        ) : (
          <div className="flex min-h-screen justify-center items-center">
            <CircularProgress />
          </div>
        )}
      </div>
    </div>
  );
}
