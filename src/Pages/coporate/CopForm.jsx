"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

import { auth } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { openScackbar } from "../../Redux/Slice/snackBarSlice";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { Close } from "@mui/icons-material";
import { UserAuth } from "../../context/AuthContext";

export default function CopForm() {
  const [open, setOpen] = React.useState(false);
  const { copObj } = UserAuth();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  const schema = yup.object({
    name: yup
      .string()
      .required("Enter Company Name")
      .transform((v) => v.toLowerCase()),
    mobile: yup.string().required("Enter Mobile Number").length(10),
    email: yup.string(),
    address: yup.string().required("Enter address "),
  });
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    reset,
    watch,
    unregister,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleRegister = async (data) => {
    try {
      const q = query(
        collection(getFirestore(), "coporate"),
        where("name", "==", data.name)
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        const addCop = await addDoc(
          collection(getFirestore(), "coporate"),
          data
        );
        const pushdata = {
          name: data.name,
          cop_id: addCop.id,
        };
        await updateDoc(doc(getFirestore(), "data", "coporate"), {
          coporate: { ...copObj, [addCop.id]: pushdata },
        });
        reset();
        dispatch(openScackbar({ open: true, type: "success", msg: "success" }));
      } else {
        dispatch(
          openScackbar({
            open: true,
            type: "error",
            msg: "Given Company Name Already Exist",
          })
        );
      }
    } catch (error) {
      dispatch(openScackbar({ open: true, type: "error", msg: error.message }));
    }
  };

  return (
    <React.Fragment>
      <Button sx={{ m: 1 }} variant="contained" onClick={handleClickOpen}>
        Register Coporate
      </Button>
      <Dialog maxWidth="md" open={open} onClose={handleClose}>
        <DialogTitle>
          <IconButton onClick={handleClose}>
            <Close color="error" />
          </IconButton>
          Coporate Register Form
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(handleRegister)}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  sx={{ my: 1 }}
                  {...field}
                  value={field.value || ""}
                  type="text"
                  label="Name"
                  fullWidth
                  error={errors.name ? true : false}
                  helperText={errors.name && errors.name.message}
                />
              )}
            />
            <Controller
              name="mobile"
              control={control}
              render={({ field }) => (
                <TextField
                  sx={{ my: 1 }}
                  {...field}
                  value={field.value || ""}
                  label="Mobile"
                  type="number"
                  fullWidth
                  error={errors.mobile ? true : false}
                  helperText={errors.mobile && errors.mobile.message}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  sx={{ my: 1 }}
                  {...field}
                  value={field.value || ""}
                  type="email"
                  label="Email"
                  fullWidth
                  error={errors.email ? true : false}
                  helperText={errors.email && errors.email.message}
                />
              )}
            />

            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <TextField
                  sx={{ my: 1 }}
                  {...field}
                  value={field.value || ""}
                  type="text"
                  label="Address"
                  fullWidth
                  error={errors.address ? true : false}
                  helperText={errors.address && errors.address.message}
                />
              )}
            />

            <Button
              sx={{ my: 1, width: "100%" }}
              type="submit"
              variant="contained"
            >
              Add User
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
