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
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

import { auth } from "../../firebase";
import { useDispatch } from "react-redux";
import { openScackbar } from "../../Redux/Slice/snackBarSlice";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

export default function EmployeDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  const schema = yup.object({
    name: yup.string().required("Enter Name"),
    mobile: yup.string().required("Enter Mobile Number"),
    email: yup.string().required("Enter Email"),
    password: yup
      .string()
      .required("Enter Password For User")
      .min(8, "need at least 8 letters"),
    area: yup.string().required("Enter Oparating area"),
    job_role: yup.string().required("Select user Job Role"),
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
      // Create a new user account without automatic sign-in
      await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      ).then(async (e) => {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );

        const user = userCredential.user;

        // Update user profile
        await updateProfile(user, {
          displayName: data.name,
        });

        // Save additional user data to Firestore
        const pushData = {
          name: data.name,
          mobile: data.mobile,
          email: data.email,
          area: data.area,
          job_role: data.job_role,
        };
        await setDoc(doc(getFirestore(), "user", user.uid), pushData);
      });

      reset();
      dispatch(
        openScackbar({
          open: true,
          type: "success",
          msg: "User Added Opening.... new user",
        })
      );
    } catch (error) {
      dispatch(openScackbar({ open: true, type: "error", msg: error.message }));
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog maxWidth="md" open={open} onClose={handleClose}>
        <DialogTitle>Add Employee</DialogTitle>
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
                  type="text"
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
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  sx={{ my: 1 }}
                  {...field}
                  value={field.value || ""}
                  type="password"
                  label="Password"
                  fullWidth
                  error={errors.password ? true : false}
                  helperText={errors.password && errors.password.message}
                />
              )}
            />
            <Controller
              name="area"
              control={control}
              render={({ field }) => (
                <TextField
                  sx={{ my: 1 }}
                  {...field}
                  value={field.value || ""}
                  type="text"
                  label="Managing Area"
                  fullWidth
                  error={errors.area ? true : false}
                  helperText={errors.area && errors.area.message}
                />
              )}
            />
            <Controller
              name="job_role"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel>Job Role</InputLabel>
                  <Select
                    error={errors.job_role ? true : false}
                    {...field}
                    value={field.value || ""}
                    label="Select Rate"
                  >
                    <MenuItem value={"rider"}>
                      <Typography>Rider</Typography>
                    </MenuItem>
                    <MenuItem value={"branch"}>
                      <Typography>Branch</Typography>
                    </MenuItem>
                    <MenuItem value={"admin"}>
                      <Typography>Admin</Typography>
                    </MenuItem>
                  </Select>
                  <FormHelperText sx={{ color: "red" }}>
                    {errors.job_role && errors.job_role.message}
                  </FormHelperText>
                </FormControl>
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
