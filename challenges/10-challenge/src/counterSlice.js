import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    // payload should be a number, e.g. { payload: 5 }
    incrementBy: (state, action) => {
      const n = Number(action.payload) || 0;
      state.value += n;
    },
    reset: (state) => {
      state.value = 0;
    },
  },
});

export const { increment, decrement, incrementBy, reset } = counterSlice.actions;
export default counterSlice.reducer;