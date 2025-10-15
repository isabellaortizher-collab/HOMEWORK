import { configureStore} from "@reduxjs/toolkit"
import authReducer from "../features/authSlice"
import postsReducer from "../features/postsSlice"
import notificationsReducer from "../features/notiSlice"
import dmsReducer from "../features/dmsSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    notifications: notificationsReducer,
    dm: dmsReducer,
  },
});

export default store;
