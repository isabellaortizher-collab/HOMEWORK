import { createSlice } from "@reduxjs/toolkit";

export const firebaseSlice = createSlice({
  name: "firebase",
  initialState: {
    data: [],
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    addItem: (state, action) => {
      state.data.push(action.payload);
    },
    updateItem: (state, action) => {
      const index = state.data.findIndex((i) => i.id === action.payload.id);
      if (index !== -1) state.data[index] = action.payload;
    },
    deleteItem: (state, action) => {
      state.data = state.data.filter((i) => i.id !== action.payload);
    },
  },
});

export const { setData, addItem, updateItem, deleteItem } = firebaseSlice.actions;
export default firebaseSlice.reducer;
