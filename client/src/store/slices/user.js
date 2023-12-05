import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  sidebar: "inactive",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    removeUser: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },

    makeSidebarActive: (state) => {
      state.sidebar = "active";
    },

    makeSidebarInactive: (state) => {
      state.sidebar = "inactive";
    },
  },
});

export const { addUser, removeUser, makeSidebarActive, makeSidebarInactive } =
  userSlice.actions;

export default userSlice.reducer;
