import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { loadGlobalState } from "../firebase/config";


const serializeUser = (user) => {
  if (!user) return null;
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName ?? null,
    photoURL: user.photoURL ?? null,
  };
};



export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ email, password }, thunkAPI) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    return serializeUser(res.user); 
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return serializeUser(res.user); 
  }
);

export const loginWithGoogle = createAsyncThunk(
  "auth/google",
  async (_, thunkAPI) => {
    const provider = new GoogleAuthProvider();
    const res = await signInWithPopup(auth, provider);
    return serializeUser(res.user); 
  }
);

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  await signOut(auth);
  return true;
});

export const initAuthListener = createAsyncThunk(
  "auth/initListener",
  async (_, thunkAPI) => {
    return new Promise((resolve) => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          try {
            const state = await loadGlobalState(user.uid);
            resolve({
              user: serializeUser(user), 
              persistedState: state,
            });
          } catch (err) {
            resolve({
              user: serializeUser(user),
              persistedState: null,
            });
          }
        } else {
          resolve({ user: null, persistedState: null });
        }
      });
    });
  }
);


const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    status: "idle",
    error: null,
    restoredState: null,
  },
  reducers: {
    setRestoredState(state, action) {
      state.restoredState = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(initAuthListener.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.restoredState = action.payload.persistedState;
      });
  },
});

export const { setRestoredState } = authSlice.actions;
export default authSlice.reducer;
