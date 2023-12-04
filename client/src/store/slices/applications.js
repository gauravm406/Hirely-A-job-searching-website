import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  applicationsData: localStorage.getItem("applicationsData")
    ? JSON.parse(localStorage.getItem("applicationsData"))
    : null,
};

export const userSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    addApplication: (state, action) => {
      state.applicationsData = action.payload;
      localStorage.setItem("applicationsData", JSON.stringify(action.payload));
    },
    removeApplication: (state) => {
      state.applicationsData = null;
      localStorage.removeItem("applicationsData");
    },
  },
});

export const { addApplication, removeApplication } = userSlice.actions;

export default userSlice.reducer;
