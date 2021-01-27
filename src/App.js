import React, { useEffect } from "react";
import "./App.css";
import WebcamCapture from "./components/WebcamCapture";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Preview from "./components/Preview";
import Chats from "./components/Chats";
import PostView from "./components/PostView";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/appSlice";
import Login from "./components/Login";
import { auth } from "./app/firebase";
function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            username: authUser.displayName,
            profilePic: authUser.photoURL,
            id: authUser.uid,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);

  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
            <img
              className="app__logo"
              src="https://lakeridgenewsonline.com/wp-content/uploads/2020/04/snapchat.jpg"
            />
            <div className="app__body">
              <div className="app__bodyBG">
                <Switch>
                  <Route exact path="/posts/view">
                    <PostView />
                  </Route>
                  <Route exact path="/posts">
                    <Chats />
                  </Route>
                  <Route exact path="/preview">
                    <Preview />
                  </Route>
                  <Route exact path="/">
                    <WebcamCapture />
                  </Route>
                </Switch>
              </div>
            </div>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;

//https://www.pngkey.com/png/full/859-8598072_picture-freeuse-library-silhouette-mobile-at-getdrawings-cell.png
