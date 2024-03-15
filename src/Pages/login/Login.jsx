import { openScackbar } from "../../Redux/Slice/snackBarSlice";
import {
  Alert,
  Button,
  Card,
  CircularProgress,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { motion } from "framer-motion";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("lahirushirant@gmail.com");
  const [password, setPassword] = useState("qwertyu");
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  if (loading) {
    return (
      <div className="flex min-h-screen justify-center items-center">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="flex sm:flex-row flex-col items-center justify-center w-screen h-screen">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="sm:w-1/2 w-screen"
      >
        <LazyLoadImage
          src={"/login.jpg"}
          alt="delivery"
          width={500}
          height={500}
          style={{ objectFit: "contain", width: "auto", margin: "auto" }}
        />
      </motion.div>

      <motion.form className="sm:w-1/2 w-screen flex flex-col max-w-lg gap-5 p-2">
        <motion.div
          variants={inputAnimation}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.2 }}
        >
          <Typography fontWeight={600} color={"GrayText"} variant="h5">
            Delivery Management & Tracking System
          </Typography>
        </motion.div>
        <motion.div
          variants={inputAnimation}
          transition={{ duration: 0.8 }}
          initial="initial"
          animate="animate"
        >
          <TextField
            fullWidth
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            type="email"
            value={email}
          />
        </motion.div>
        <motion.div
          variants={inputAnimation}
          transition={{ duration: 0.8 }}
          initial="initial"
          animate="animate"
        >
          <TextField
            fullWidth
            onChange={(e) => setPassword(e.target.value)}
            sx={{ my: 2 }}
            label="Password"
            type="password"
            value={password}
          />
        </motion.div>
        <motion.div
          variants={inputAnimation}
          initial="initial"
          animate="animate"
          transition={{ duration: 1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            const authz = getAuth();
            sendPasswordResetEmail(authz, email)
              .then(() => {
                dispatch(
                  openScackbar({
                    open: true,
                    type: "success",
                    msg: `Email Reset sent to ${email} check your inbox`,
                  })
                );
              })
              .catch((error) => {
                dispatch(
                  openScackbar({
                    open: true,
                    type: "error",
                    msg: error.message,
                  })
                );

                // ..
              });
          }}
        >
          <Typography
            className="cursor-pointer "
            fontWeight={600}
            variant="body1"
            color={"primary"}
          >
            Forgot password?
          </Typography>
        </motion.div>
        <motion.div
          className="m-auto w-full"
          variants={animationBtn}
          transition={{ duration: 1 }}
          initial="initial"
          animate="animate"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button
            fullWidth
            onClick={() => {
              signInWithEmailAndPassword(email, password).then(() => {
                navigate("/", { replace: true });
                dispatch(
                  openScackbar({
                    open: true,
                    type: "success",
                    msg: "Login Complete",
                  })
                );
              });
            }}
            sx={{ mb: 2 }}
            variant="contained"
          >
            Login
          </Button>
        </motion.div>
      </motion.form>
    </div>
  );
}

const inputAnimation = {
  initial: {
    opacity: 0,
    scale: 0.6,
  },
  animate: {
    opacity: 1,
    scale: 1,
  },
};

const animationBtn = {
  initial: {
    opacity: 0,
    scale: 0.6,
  },
  animate: {
    opacity: 1,
    scale: 1,
  },
};
