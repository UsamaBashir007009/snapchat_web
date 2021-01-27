import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { resetImage, selectCameraImg } from "../features/cameraSlice";
import "./Preview.css";
import CloseIcon from "@material-ui/icons/Close";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import CreateIcon from "@material-ui/icons/Create";
import NoteIcon from "@material-ui/icons/Note";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import CropIcon from "@material-ui/icons/Crop";
import TimerIcon from "@material-ui/icons/Timer";
import SendIcon from "@material-ui/icons/Send";
import { v4 as uuid } from "uuid";
import { db, storage } from "../app/firebase";
import firebase from "firebase";
import { selectUser } from "../features/appSlice";

function Preview() {
  const mysnap = useSelector(selectCameraImg);
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const closePreview = () => {
    dispatch(resetImage());
  };
  const postImage = () => {
    const id = uuid();
    const uploadTask = storage.ref(`posts/${id}`).putString(mysnap, "data_url");
    uploadTask.on(
      "state_changed",
      null,
      (error) => {
        //ON ERROR
        console.log(error);
      },
      () => {
        //ON COMPLETE
        storage
          .ref("posts")
          .child(id)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts").add({
              imgURL: url,
              userName: user.username,
              read: false,
              profilePic: user.profilePic,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
          });
        history.replace("/posts");
      }
    );
  };

  useEffect(() => {
    if (!mysnap) history.replace("/");
  }, [mysnap, history]);

  return (
    <div className="preview">
      <CloseIcon className="preview__close" onClick={closePreview} />
      <div className="preview__toolbar">
        <TextFieldsIcon />
        <CreateIcon />
        <NoteIcon />
        <MusicNoteIcon />
        <AttachFileIcon />
        <CropIcon />
        <TimerIcon />
      </div>
      <img src={mysnap} />
      <div className="preview__footer" onClick={postImage}>
        <h2>Send Now</h2>
        <SendIcon fontSize="small" className="preview__send" />
      </div>
    </div>
  );
}

export default Preview;
