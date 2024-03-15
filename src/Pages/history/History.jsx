import React, { useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import dayjs from "dayjs";
import HistoryTable from "./HistoryTable";
import { useDispatch } from "react-redux";
import { openScackbar } from "../../Redux/Slice/snackBarSlice";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { UserAuth } from "../../context/AuthContext";
import {
  Card,
  CardContent,
  CardHeader,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
export default function History() {
  const { userData, branchArray } = UserAuth();

  const [value, setValue] = useState(dayjs(new Date()));

  const [loading, setLoading] = React.useState(true);
  const [total, setTotal] = React.useState("");
  const [packageData, setPackageData] = React.useState([]);
  const [DOME, setDOME] = React.useState(
    packageData.filter((e) => e.cop_id && e.delivery_type === "dom")
  );
  const [INTR, setINTR] = React.useState(
    packageData.filter((e) => e.cop_id && e.delivery_type === "int")
  );
  const [branch, setBranch] = React.useState("");
  const dispatch = useDispatch();

  React.useEffect(() => {
    const data = async () => {
      setLoading(true);
      try {
        const q = query(
          collection(getFirestore(), "package"),
          where(
            "branch",
            "==",
            userData.job_role === "admin" ? branch : userData.area
          ),
          where("date", ">=", value.startOf("day").toDate()),
          where("date", "<=", value.endOf("day").toDate())
        );
        const querySnapshot = await getDocs(q);
        const packageList = [];
        if (querySnapshot.docs.length > 0) {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            packageList.push({ ...doc.data(), package_id: doc.id });
          });
          setPackageData(packageList);
        } else {
          setPackageData([]);

          dispatch(openScackbar({ open: true, type: "error", msg: "no data" }));
        }
      } catch (err) {
        dispatch(openScackbar({ open: true, type: "error", msg: err.message }));
        console.log(err);
      }
    };
    if (value) {
      data();
    }
  }, [value, branch]);

  return (
    <div>
      <div className="flex flex-wrap items-center">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker
              label={"Select Date"}
              views={["month", "year", "day"]}
              value={value}
              onChange={(newValue) => setValue(newValue)}
            />
          </DemoContainer>
        </LocalizationProvider>
        {userData.job_role === "admin" && (
          <div className="md:w-96 md:mx-2 mt-4 w-screen my-2">
            <FormControl fullWidth>
              <InputLabel>Select Branch</InputLabel>
              <Select
                value={branch}
                onChange={(e) => {
                  setBranch(e.target.value);
                }}
                label="Select Branch"
              >
                {branchArray.map((item) => (
                  <MenuItem key={item.id} value={item.area}>
                    <div className="flex justify-between w-full">
                      <Typography>Name: {item.name} /</Typography>
                      <Typography>Ariea: {item.area}</Typography>
                    </div>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        )}
      </div>
      <div className="flex flex-wrap">
        <Card className="md:w-96 w-screen my-2">
          <CardContent>
            <Typography fontWeight={600} color={"GrayText"} variant="subtitle1">
              Coporate
            </Typography>
            <div className="flex justify-between">
              <Typography>Domestic </Typography>
              <Typography>
                Rs.
                {packageData
                  .filter((e) => e.cop_id && e.delivery_type === "dom")
                  .reduce((acc, curr) => acc + curr.rate, 0)}
              </Typography>
            </div>
            <div className="flex justify-between">
              <Typography>International </Typography>
              <Typography>
                Rs.
                {packageData
                  .filter((e) => e.cop_id && e.delivery_type === "int")
                  .reduce((acc, curr) => acc + curr.rate, 0)}
              </Typography>
            </div>

            <div className="flex justify-between">
              <Typography color={"InactiveCaptionText"}>
                Grand Total{" "}
              </Typography>
              <Typography color={"InactiveCaptionText"}>
                Rs.
                {packageData
                  .filter((e) => e.cop_id && e.delivery_type === "int")
                  .reduce((acc, curr) => acc + curr.rate, 0) +
                  packageData
                    .filter((e) => e.cop_id && e.delivery_type === "dom")
                    .reduce((acc, curr) => acc + curr.rate, 0)}
              </Typography>
            </div>
          </CardContent>
        </Card>
        <Card className="md:w-96 md:m-2 w-screen my-2">
          <CardContent>
            <Typography fontWeight={600} color={"GrayText"} variant="subtitle1">
              Individual
            </Typography>
            <div className="flex justify-between">
              <Typography>Domestic </Typography>
              <Typography>
                Rs.
                {packageData
                  .filter((e) => !e.cop_id && e.delivery_type === "dom")
                  .reduce((acc, curr) => acc + curr.rate, 0)}
              </Typography>
            </div>
            <div className="flex justify-between">
              <Typography>International </Typography>
              <Typography>
                Rs.
                {packageData
                  .filter((e) => !e.cop_id && e.delivery_type === "int")
                  .reduce((acc, curr) => acc + curr.rate, 0)}
              </Typography>
            </div>

            <div className="flex justify-between">
              <Typography>Grand Total </Typography>
              <Typography>
                Rs.
                {packageData
                  .filter((e) => !e.cop_id && e.delivery_type === "int")
                  .reduce((acc, curr) => acc + curr.rate, 0) +
                  packageData
                    .filter((e) => !e.cop_id && e.delivery_type === "dom")
                    .reduce((acc, curr) => acc + curr.rate, 0)}
              </Typography>
            </div>
          </CardContent>
        </Card>
      </div>
      <div>
        <HistoryTable packageData={packageData} />
      </div>
    </div>
  );
}
