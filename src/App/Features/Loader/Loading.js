import React from "react";
import hsLogo from "../../../Images/hslogo1.png";
const Loading = () => {
  return (
    <div className="loading__container">
      <p className="loading__txt">Loading</p>

      <img src={hsLogo} className="loading__img" alt="loading"></img>
    </div>
  );
};

export default Loading;
