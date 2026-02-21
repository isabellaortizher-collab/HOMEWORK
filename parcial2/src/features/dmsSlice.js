import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  queue: [] 
};

const dmSlice = createSlice({
  name: "dm",
  initialState,
  reducers: {
    enqueueDM(state, action) {
      state.queue.push(action.payload);
    },
    dequeueDM(state) {
      state.queue.shift();
    },
    clearDM(state) {
      state.queue = [];
    },
    setQueue(state, action) {
      state.queue = action.payload;
    }
  }
});

export const { enqueueDM, dequeueDM, clearDM, setQueue } = dmSlice.actions;
export default dmSlice.reducer;
