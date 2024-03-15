import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  DATA: [],
  DATAObj: {},
  loading: true,
  USERDATA: null,
};

export const rootDataSlice = createSlice({
  name: "root_data",
  initialState,
  reducers: {
    setRootData: (state, action) => {
      const { DATA, loading, DATAObj } = action.payload;
      state.DATA = DATA;
      state.loading = loading;
      state.DATAObj = DATAObj;
    },
    setUserData: (state, action) => {
      state.USERDATA = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setRootData, setUserData } = rootDataSlice.actions;

export default rootDataSlice.reducer;
