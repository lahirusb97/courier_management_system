import React, { useEffect, useRef, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import BoxInter from "../../Components/BoxInter";
import CameraOpen from "../../Components/scanoptions/CameraOpen";
import { useDispatch } from "react-redux";
import { openScackbar } from "../../Redux/Slice/snackBarSlice";
import {
  doc,
  getDoc,
  getFirestore,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { UserAuth } from "../../context/AuthContext";

export default function NormalForm() {
  const [deliType, setDeliType] = useState("dom");
  const [package_ID, setPackage_ID] = React.useState("");
  const [branch, setBranch] = React.useState("");
  const [selectedbranch, setSelectedBranch] = React.useState("");
  const { userData, loading, copArray, branchArray } = UserAuth();

  const dispatch = useDispatch();
  const getPackageID = (id) => {
    setPackage_ID(id);
  };
  const isMounted = useRef(true);

  const schema = yup.object({
    s_name: yup.string().required("Enter Sender name"),
    s_address: yup.string().required("Enter Sender Address"),
    s_mobile: yup.string().required("Enter Sender Mobile Number"),
    r_name: yup.string().required("Enter Reciver name"),
    r_address: yup.string().required("Enter Reciver Address"),
    r_mobile: yup.string().required("Enter Reciver Mobile Number"),
    rate: yup.number().positive().required("Enter Delivery Rate").moreThan(0),
    package_price: yup
      .number()
      .required("Enter COD Package Price")
      .moreThan(-1)
      .default(0),
    weight: yup.number().positive().required("Enter Package Weight"),
    branch: yup.string().required("Select Branch"),
    rate_cod: yup.bool().default(false),
    country:
      deliType === "dom"
        ? yup.string()
        : yup.string().required("Enter Country"),
    city:
      deliType === "dom" ? yup.string() : yup.string().required("Enter City"),
    tracking_id:
      deliType === "dom"
        ? yup.string()
        : yup.string().required("Enter Package Tracking Number"),
    zip_code:
      deliType === "dom"
        ? yup.string()
        : yup.string().required("Enter Zip Code"),
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
  useEffect(() => {
    if (!userData.job_role === "admin") {
      setValue("branch", userData.area);
    } else {
      setValue("branch", "");
    }
  }, [userData]);

  const addPackage = async (data) => {
    if (package_ID) {
      const pushDataIntr = {
        date: serverTimestamp(),
        sender: {
          name: data.s_name,
          address: data.s_address,
          mobile: data.s_mobile,
        },
        reciver: {
          name: data.r_name,
          address: data.r_address,
          mobile: data.r_mobile,
          country: data.country,
          city: data.city,
          zip_code: data.zip_code,
        },
        tracking_id: data.tracking_id,
        delivery_type: deliType,
        rate: data.rate,
        rate_cod: data.rate_cod,
        package_price: data.package_price,
        weight: data.weight,
        cod: data.rate_cod === true || data.package_price > 0 ? true : false,
        state: "pending",
        branch: data.branch,
        tracking: {
          [userData.id]: {
            name: userData.name,
            area: userData.area,
            date: serverTimestamp(),
            job_role:
              userData.job_role === "rider"
                ? "Rider"
                : userData.job_role === "branch"
                ? "Branch"
                : userData.job_role === "admin"
                ? "Manager"
                : "",
          },
        },
      };
      const pushDataLocal = {
        date: serverTimestamp(),
        sender: {
          name: data.s_name,
          address: data.s_address,
          mobile: data.s_mobile,
        },
        reciver: {
          name: data.r_name,
          address: data.r_address,
          mobile: data.r_mobile,
        },
        delivery_type: deliType,
        rate: data.rate,
        rate_cod: data.rate_cod,
        package_price: data.package_price,
        weight: data.weight,
        cod: data.rate_cod === true || data.package_price > 0 ? true : false,
        state: "pending",
        branch: data.branch,
        tracking: {
          [userData.id]: {
            name: userData.name,
            area: userData.area,
            date: serverTimestamp(),
            job_role:
              userData.job_role === "rider"
                ? "Rider"
                : userData.job_role === "branch"
                ? "Branch"
                : userData.job_role === "admin"
                ? "Manager"
                : "",
          },
        },
      };

      try {
        const docRef = doc(
          getFirestore(),
          "package",
          `${package_ID.toString()}`
        );
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          await setDoc(
            doc(getFirestore(), "package", `${package_ID}`),
            deliType === "dom" ? pushDataLocal : pushDataIntr
          ).then(() => {
            if (deliType === "int") {
              reset({
                s_name: "",
                s_address: "",
                s_mobile: "",
                r_name: "",
                r_address: "",
                r_mobile: "",
                rate: 0,
                package_price: 0,
                weight: "",
                rate_cod: false,
                country: "",
                city: "",
                tracking_id: "",
                zip_code: "",
              });
            } else {
              reset({
                s_name: "",
                s_address: "",
                s_mobile: "",
                r_name: "",
                r_address: "",
                r_mobile: "",
                rate: 0,
                package_price: 0,
                weight: "",
                rate_cod: false,
              });
            }

            reset();
            setPackage_ID("");
          });

          dispatch(
            openScackbar({ open: true, type: "success", msg: "Package Added" })
          );
        } else {
          dispatch(
            openScackbar({
              open: true,
              type: "error",
              msg: "Package ID Alredy Exists",
            })
          );
        }
      } catch (err) {
        openScackbar({ open: true, type: "error", msg: err.message });
      }
    } else {
      dispatch(
        openScackbar({ open: true, type: "error", msg: "Enter Package ID" })
      );
    }
  };
  useEffect(() => {
    if (deliType === "dom" && !isMounted.current) {
      unregister(["country", "city", "zip_code", "tracking_id"]);
    }
  }, [unregister, deliType, isMounted.current]);

  return (
    <div>
      <form onSubmit={handleSubmit(addPackage)}>
        <CameraOpen getPackageID={getPackageID} />
        <Typography variant="h6">
          Package ID: {package_ID ? package_ID : "---"}
        </Typography>

        <div className="flex justify-center text-center">
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Delivery Type
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={deliType}
              onChange={(e) => {
                setDeliType(e.target.value);
              }}
            >
              <FormControlLabel
                value={"dom"}
                control={<Radio />}
                label="Domestic"
                defaultChecked
              />
              <FormControlLabel
                value={"int"}
                control={<Radio />}
                label="International"
              />
            </RadioGroup>
          </FormControl>
        </div>
        <div className="flex md:flex-row flex-col justify-around p-2 gap-4">
          <Paper className="md:w-input-max" variant="elevation" elevation={2}>
            <Typography
              align="center"
              color={"GrayText"}
              variant="h6"
              fontWeight={600}
              m={1}
            >
              Sender Details
            </Typography>
            <div className="flex flex-col gap-4 m-2">
              <Controller
                name="s_name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Name"
                    fullWidth
                    type="text"
                    defaultValue=""
                    error={errors.s_name ? true : false}
                    helperText={errors.s_name && errors.s_name.message}
                  />
                )}
              />
              <Controller
                name="s_address"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    defaultValue=""
                    label="Address"
                    type="text"
                    fullWidth
                    error={errors.s_address ? true : false}
                    helperText={errors.s_address && errors.s_address.message}
                  />
                )}
              />
              <Controller
                name="s_mobile"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    defaultValue=""
                    label="Mobile"
                    type="number"
                    fullWidth
                    error={errors.s_mobile ? true : false}
                    helperText={errors.s_mobile && errors.s_mobile.message}
                  />
                )}
              />
            </div>
          </Paper>
          <Paper
            className="md:w-input-max p-2"
            variant="elevation"
            elevation={2}
          >
            <Typography
              align="center"
              color={"GrayText"}
              variant="h6"
              fontWeight={600}
              m={1}
            >
              Reciver Details
            </Typography>
            <div className="flex flex-col gap-4 ">
              <Controller
                name="r_name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    defaultValue=""
                    label="Name"
                    type="text"
                    fullWidth
                    error={errors.r_name ? true : false}
                    helperText={errors.r_name && errors.r_name.message}
                  />
                )}
              />
              <Controller
                name="r_address"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    defaultValue=""
                    label="Address"
                    type="text"
                    fullWidth
                    error={errors.r_address ? true : false}
                    helperText={errors.r_address && errors.r_address.message}
                  />
                )}
              />
              <Controller
                name="r_mobile"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    defaultValue=""
                    label="Mobile"
                    fullWidth
                    type="number"
                    error={errors.r_mobile ? true : false}
                    helperText={errors.r_mobile && errors.r_mobile.message}
                  />
                )}
              />

              <div className="flex flex-col gap-4">
                {deliType === "int" ? (
                  <div ref={isMounted}>
                    <BoxInter control={control} errors={errors} />
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </Paper>
        </div>
        <Paper className="p-2 m-4 " variant="elevation" elevation={2}>
          <Typography
            align="center"
            color={"GrayText"}
            variant="h6"
            fontWeight={600}
            m={1}
          >
            Package Details
          </Typography>

          <div className="grid md:grid-cols-2 md:grid-rows-2 gap-4 grid-rows-4  ">
            {userData.job_role === "admin" && (
              <Controller
                name="branch"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <InputLabel>Select Branch</InputLabel>
                    <Select
                      {...field}
                      value={field.value || ""}
                      label="Select Branch"
                      error={errors.branch ? true : false}
                    >
                      {branchArray.map((item) => (
                        <MenuItem key={item.id} value={item.area}>
                          <div className="flex justify-between w-full">
                            <Typography>Name: {item.name}</Typography>
                            <Typography>Ariea: {item.area}</Typography>
                          </div>
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.branch && (
                      <FormHelperText sx={{ color: "red" }}>
                        {errors.branch.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            )}

            <div className="flex gap-2">
              <Controller
                name="rate"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="number"
                    defaultValue=""
                    label="Delivery Rate"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    error={errors.rate ? true : false}
                    helperText={errors.rate && errors.rate.message}
                  />
                )}
              />
              <Controller
                name="rate_cod"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox {...field} />}
                    label="COD"
                  />
                )}
              />
            </div>
            <Controller
              name="package_price"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="number"
                  defaultValue={0}
                  label="COD Package Price"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">Rs</InputAdornment>
                    ),
                  }}
                  error={errors.package_price ? true : false}
                  helperText={
                    errors.package_price && errors.package_price.message
                  }
                />
              )}
            />
            <Controller
              name="weight"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="number"
                  defaultValue=""
                  label="Package Weight"
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start">kg</InputAdornment>
                    ),
                  }}
                  error={errors.rate ? true : false}
                  helperText={errors.rate && errors.rate.message}
                />
              )}
            />
          </div>
        </Paper>
        <div className="flex justify-center">
          <Button
            className="md:w-input-max w-full"
            variant="contained"
            type="submit"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
