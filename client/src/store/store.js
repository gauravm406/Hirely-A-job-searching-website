import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user.js";
import applicationReducer from "./slices/applications.js";

export const store = configureStore({
  reducer: {
    user: userReducer,
    application: applicationReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});
