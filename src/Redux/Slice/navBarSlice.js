import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  OPEN: false,
};

export const navBarSlice = createSlice({
  name: "nav_bar",
  initialState,
  reducers: {
    openNavBar: (state) => {
      state.OPEN = state.OPEN ? false : true;
    },
    closeNav: (state) => {
      state.OPEN = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { openNavBar, closeNav } = navBarSlice.actions;

export default navBarSlice.reducer;
