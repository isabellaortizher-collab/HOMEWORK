import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // top of stack = end of array
};

const stackSlice = createSlice({
  name: 'stack',
  initialState,
  reducers: {
    push: (state, action) => {
      state.items.push(action.payload);
    },
    pop: (state) => {
      state.items.pop();
    },
    clear: (state) => {
      state.items = [];
    },
    // opcional: replace top
    replaceTop: (state, action) => {
      if (state.items.length > 0) {
        state.items[state.items.length - 1] = action.payload;
      }
    },
  },
});

export const { push, pop, clear, replaceTop } = stackSlice.actions;
export default stackSlice.reducer;