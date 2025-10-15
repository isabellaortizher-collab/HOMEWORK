import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stack: [], 
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {

    pushNotification(state, action) {
      state.stack.unshift(action.payload); 
    },


    popNotification(state) {
      state.stack.shift(); 
    },

    clearNotifications(state) {
      state.stack = [];
    },

    setNotifications(state, action) {
      state.stack = action.payload;
    },
  },
});

export const {
  pushNotification,
  popNotification,
  clearNotifications,
  setNotifications,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;

