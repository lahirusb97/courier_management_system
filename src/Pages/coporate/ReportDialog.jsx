import * as React from "react";

import Dialog from "@mui/material/Dialog";

import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { Card, CardContent, DialogContent } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import dayjs from "dayjs";
import PackageTable from "./PackageTable";
import BarChart from "../../Components/BarChart";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { useDispatch } from "react-redux";
import { openScackbar } from "../../Redux/Slice/snackBarSlice";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ReportDialog({
  handleClickOpen,
  handleClose,
  open,
  ID,
}) {
  const [value, setValue] = React.useState(dayjs(new Date()));
  const [loading, setLoading] = React.useState(true);
  const [total, setTotal] = React.useState("");
  const [packageData, setPackageData] = React.useState([]);
  const dispatch = useDispatch();
  React.useEffect(() => {
    const data = async () => {
      setLoading(true);
      try {
        const docRef = await getDoc(
          doc(
            getFirestore(),
            "coporate",
            ID,
            value["$y"].toString(),
            (value["$M"] + 1).toString() // Adding 1 to the month as months are zero-based
          )
        );
        if (docRef.exists()) {
          setTotal(docRef.data());
        } else {
          setTotal("");
        }
        //ALL PACKAGE DATA
        const q = query(
          collection(getFirestore(), "package"),
          where("cop_id", "==", ID),
          where("date", ">=", value.startOf("month").toDate()),
          where("date", "<=", value.endOf("month").toDate())
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
      }
    };
    if (ID && value) {
      data();
    }
  }, [ID, value, open]);

  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={open}
        onClose={() => {
          handleClose();
          setPackageData([]);
          setTotal("");
        }}
        TransitionComponent={Transition}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => {
              handleClose();
              setPackageData([]);
              setTotal("");
            }}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label={"Select Date"}
                views={["month", "year"]}
                value={value}
                onChange={(newValue) => setValue(newValue)}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Toolbar>

        <DialogContent>
          <div className="flex md:flex-row flex-col">
            <Card className="md:w-1/2 w-dialog-screen2">
              <CardContent>
                <div className="flex gap-4 justify-between">
                  <Typography variant="h6" color="black">
                    Domestic
                  </Typography>
                  <Typography variant="h6" color="black">
                    {
                      packageData.filter((item) => item.delivery_type === "dom")
                        .length
                    }
                  </Typography>
                </div>
                <div className="flex gap-4 justify-between">
                  <Typography variant="h6" color="black">
                    International
                  </Typography>
                  <Typography variant="h6" color="black">
                    {
                      packageData.filter((item) => item.delivery_type === "int")
                        .length
                    }
                  </Typography>
                </div>
                <div className="flex gap-4 justify-between">
                  <Typography variant="h6" color="black">
                    Total Delivery
                  </Typography>
                  <Typography variant="h6" color="black">
                    {packageData.length}
                  </Typography>
                </div>
                <BarChart packageData={packageData} />

                <div className="flex  justify-between gap-4">
                  <Typography variant="h6" color="black">
                    Total Manthly Payment
                  </Typography>
                  <Typography variant="h6" color="black">
                    {total.total_rate ? total.total_rate : 0}
                  </Typography>
                </div>
                <div className="flex justify-between  gap-4">
                  <Typography variant="h6" color="black">
                    Total on Cash
                  </Typography>
                  <Typography variant="h6" color="black">
                    {total.on_cash_sale ? total.on_cash_sale : 0}
                  </Typography>
                </div>
                <div className="flex justify-between  gap-4">
                  <Typography variant="h6" color="black">
                    Grand Total Revenue
                  </Typography>
                  <Typography variant="h6" color="black">
                    Rs.
                    {total.on_cash_sale
                      ? total.on_cash_sale
                      : 0 + total.total_rate
                      ? total.total_rate
                      : 0}
                  </Typography>
                </div>
              </CardContent>
            </Card>
            <div className="md:mx-2 md:my-0 mx-0 my-2 w-dialog-screen2">
              {/* <CopPayHistoryTable total={total} /> */}
              {/* <div className="flex items-center">
                <TextField
                  sx={{ width: "100%", m: 1 }}
                  label="Payement Amount"
                />
                <Button variant="contained">Pay</Button>
              </div> */}
            </div>
          </div>
          <PackageTable packageData={packageData} />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
