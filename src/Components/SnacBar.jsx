"use client";
import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";

import { useDispatch, useSelector } from "react-redux";

import MuiAlert from "@mui/material/Alert";
import { closeScackbar } from "../Redux/Slice/snackBarSlice";
import { MdClose } from "react-icons/md";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function SnacBar() {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.snack_bar.OPEN);
  const type = useSelector((state) => state.snack_bar.TYPE);
  const msg = useSelector((state) => state.snack_bar.MSG);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(closeScackbar());
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="medium"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <MdClose fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        action={action}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
          {msg}
        </Alert>
      </Snackbar>
    </div>
  );
}
