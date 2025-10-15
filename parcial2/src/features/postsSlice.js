import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  list: [], 
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts(state, action) {
      state.list = action.payload;
    },
    addPost(state, action) {
      state.list.push(action.payload);
    },
    removePost(state, action) {
      state.list = state.list.filter(p => p.id !== action.payload);
    },
    clearPosts(state) {
      state.list = [];
    }
  }
});

export const { setPosts, addPost, removePost, clearPosts } = postsSlice.actions;

export default postsSlice.reducer;
