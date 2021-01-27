import { Avatar } from "@material-ui/core";
import React, { useEffect } from "react";
import "./Post.css";
import StopRoundedIcon from "@material-ui/icons/StopRounded";
import ReactTimeago from "react-timeago";
import { useDispatch } from "react-redux";
import { selectImage } from "../features/appSlice";
import { db } from "../app/firebase";
import { useHistory } from "react-router-dom";

function Post({ id, userName, read, timestamp, profilePic, imgURL }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const open = () => {
    if (!read) {
      dispatch(selectImage(imgURL));
      db.collection("posts").doc(id).set(
        {
          read: true,
        },
        { merge: true }
      );
      history.push("/posts/view");
    }
  };
  return (
    <div className="post" onClick={open}>
      <Avatar className="post__avatar" src={profilePic} />
      <div className="post__info">
        <h4>{userName}</h4>
        <p>
          {!read && `Tap to view -  `}
          <ReactTimeago date={new Date(timestamp?.toDate()).toUTCString()} />
        </p>
      </div>
      {!read && <StopRoundedIcon className="post__readIcon" />}
    </div>
  );
}

export default Post;
