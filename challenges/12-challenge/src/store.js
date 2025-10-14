import { configureStore } from "@reduxjs/toolkit";
import firebaseReducer from "./features/firebaseSlice";

export const store = configureStore({
  reducer: {
    firebase: firebaseReducer,
  },
});

