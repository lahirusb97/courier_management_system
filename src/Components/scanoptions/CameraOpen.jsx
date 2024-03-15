"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { DialogContent, DialogTitle, Fab, TextField } from "@mui/material";
import Html5QrcodePlugin from "./Html5QrcodePlugin";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Add, Scanner } from "@mui/icons-material";
import { BsUpcScan } from "react-icons/bs";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CameraOpen({ getPackageID }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("camera");
  const [inputVal, setInputVal] = React.useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const onNewScanResult = (decodedText, decodedResult) => {
    getPackageID(decodedText);
    setOpen(false);
  };
  const fab = {
    color: "primary",
    sx: fabStyle,
    icon: <BsUpcScan size={30} />,
    label: "Add",
  };

  return (
    <React.Fragment>
      <Button
        variant="contained"
        aria-label={fab.label}
        color="primary"
        onClick={handleClickOpen}
      >
        Open Scan <BsUpcScan sx={{ m: 1 }} size={30} />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <DialogTitle>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <div>
            <FormControl>
              <FormLabel id="demo-controlled-radio-buttons-group">
                Scan Option
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={value}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="camera"
                  control={<Radio />}
                  label="Camera"
                />
                <FormControlLabel
                  value="search"
                  control={<Radio />}
                  label="Manual Input"
                />
              </RadioGroup>
            </FormControl>
          </div>
          {value === "camera" ? (
            <Html5QrcodePlugin
              fps={10}
              qrbox={250}
              disableFlip={false}
              qrCodeSuccessCallback={onNewScanResult}
            />
          ) : (
            <div className="flex">
              <TextField
                onChange={(e) => setInputVal(e.target.value)}
                size="small"
                label="Package Number"
              />
              <Button
                sx={{ mx: 1 }}
                variant="contained"
                onClick={() => {
                  if (inputVal) {
                    getPackageID(inputVal);
                    setOpen(false);
                  }
                }}
              >
                Add Package Id
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
const fabStyle = {
  position: "absolute",
  bottom: 16,
  right: 16,
};
