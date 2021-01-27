import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { selectSelectedImage } from "../features/appSlice";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import "./PostView.css";

function PostView() {
  const history = useHistory();
  const seletedImage = useSelector(selectSelectedImage);

  useEffect(() => {
    if (!seletedImage) {
      exit();
    }
  }, [seletedImage]);

  function exit() {
    history.replace("/posts");
  }
  return (
    <div className="postView">
      <img src={seletedImage} onClick={exit} />
      <div className="postView__timer">
        <CountdownCircleTimer
          isPlaying={true}
          duration={10}
          strokeWidth={6}
          size={50}
          colors={[
            ["#004777", 0.33],
            ["#F7B801", 0.33],
            ["#A30000", 0.33],
          ]}
        >
          {({ remainingTime }) => {
            if (remainingTime === 0) exit();
            return remainingTime;
          }}
        </CountdownCircleTimer>
      </div>
    </div>
  );
}

export default PostView;
