import { configureStore } from "@reduxjs/toolkit";
import SnackBarSlice from "./Slice/snackBarSlice";
import navBarSlice from "./Slice/navBarSlice";
import rootDataSlice from "./Slice/rootDataSlice";

export const store = configureStore({
  reducer: {
    snack_bar: SnackBarSlice,
    nav_bar: navBarSlice,
    root_data: rootDataSlice,
  },
});
