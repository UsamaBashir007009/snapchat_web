import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./Chats.css";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";

import SearchIcon from "@material-ui/icons/Search";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import { auth, db, storage } from "../app/firebase";
import Post from "./Post";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../features/appSlice";
import { useHistory } from "react-router-dom";
import { resetImage } from "../features/cameraSlice";

function Chats() {
  const [posts, setPosts] = useState([]);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
  }, []);

  const takeSnap = () => {
    dispatch(resetImage());
    history.push("/");
  };

  return (
    <div className="chats">
      <div className="chats__header">
        <Avatar
          src={user.profilePic}
          className="chats__avatar"
          onClick={() => {
            auth.signOut();
            history.push("/");
          }}
        />
        <div className="chats__search">
          <SearchIcon className="chats__searchIcon" />
          <input type="text" placeholder="Friends" />
        </div>
        <ChatBubbleIcon className="chats__chatIcon" />
      </div>
      <div className="chats__posts">
        {posts.map(
          ({ id, data: { imgURL, userName, profilePic, read, timestamp } }) => {
            return (
              <Post
                key={id}
                id={id}
                userName={userName}
                read={read}
                timestamp={timestamp}
                profilePic={profilePic}
                imgURL={imgURL}
              />
            );
          }
        )}
      </div>
      <RadioButtonUncheckedIcon
        className="chats__takeSnap"
        onClick={takeSnap}
        fontSize="large"
      />
    </div>
  );
}

export default Chats;
