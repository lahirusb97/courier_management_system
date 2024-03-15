import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { openScackbar } from "../../Redux/Slice/snackBarSlice";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
export default function UpdateCop({ ID, openUpdateClose, openCopEdit }) {
  const DATAObj = useSelector((state) => state.root_data.DATAObj);

  const dispatch = useDispatch();
  const schema = yup.object({
    name: yup.string(),
    mobile: yup.string().length(10),
    email: yup.string(),
    address: yup.string(),
  });
  const {
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleRegister = async (data) => {
    try {
      const addCop = await updateDoc(doc(getFirestore(), "coporate", ID), data);
      await updateDoc(doc(getFirestore(), "data", "coporate"), {
        coporate: {
          ...DATAObj,
          [ID]: {
            name: data.name,
          },
        },
      });
      reset();

      dispatch(openScackbar({ open: true, type: "success", msg: "success" }));
    } catch (error) {
      dispatch(openScackbar({ open: true, type: "error", msg: error.message }));
    }
  };
  React.useEffect(() => {
    const getCOPDATA = async () => {
      const docRef = doc(getFirestore(), "coporate", ID);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setValue("name", data.name);
        setValue("mobile", data.mobile);
        setValue("email", data.email);
        setValue("address", data.address);
      } else {
        openUpdateClose();
      }
    };
    if (ID && openCopEdit) {
      getCOPDATA();
    }
  }, [setValue, ID, openCopEdit]);

  return (
    <React.Fragment>
      <Dialog
        maxWidth="md"
        open={openCopEdit}
        onClose={() => {
          openUpdateClose();
          reset();
        }}
      >
        <DialogTitle>Update Company</DialogTitle>
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
