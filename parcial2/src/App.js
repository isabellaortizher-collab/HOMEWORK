import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initAuthListener } from "./features/authSlice"
import { setPosts } from "./features/postsSlice";
import { setNotifications } from "./features/notiSlice";
import { setQueue } from "./features/dmsSlice";
import Header from "./componentes/Header";
import Login from "./componentes/Login";
import Home from "./componentes/Home";
import { saveGlobalState } from "./firebase/config";

function App() {
  const dispatch = useDispatch();
  const { user, restoredState } = useSelector(s => s.auth);
  const posts = useSelector(s => s.posts.list);
  const notifications = useSelector(s => s.notifications.stack);
  const queue = useSelector(s => s.dm.queue);

  useEffect(() => {
    dispatch(initAuthListener());
  }, [dispatch]);

  useEffect(() => {
    if (user && restoredState) {
      if (restoredState.posts) dispatch(setPosts(restoredState.posts));
      if (restoredState.notifications) dispatch(setNotifications(restoredState.notifications));
      if (restoredState.queue) dispatch(setQueue(restoredState.queue));
    }
  }, [user, restoredState, dispatch]);

  useEffect(() => {
    async function persist() {
      if (!user) return;
      const stateToSave = {
        posts,
        notifications,
        queue
      };
      try {
        await saveGlobalState(user.uid, stateToSave);
      } catch (err) {
        console.error("Persist failed", err);
      }
    }
    persist();
  }, [posts, notifications, queue, user]);

  return (
    <div>
      <Header />
      {user ? <Home /> : <Login />}
    </div>
  );
}

export default App;

