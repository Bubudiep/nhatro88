import React, { useState } from "react";

const TamTruComponent = ({ onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300); // Thời gian trễ phải tương ứng với thời gian của animation
  };
  return (
    <div className={`bottom-box-white-bg  ${isClosing ? "hide-out" : ""}`}>
      <div className="detectOut" onClick={handleClose} />
      <div className={`bottom-box-white  ${isClosing ? "hide-down" : ""}`}>
        <div className="top-bar">
          <div className="bar"></div>
        </div>
        <div className="slider fade-in-5">
          <div className="title2">Danh sách tạm trú</div>
          <div className="body-container"></div>
        </div>
      </div>
    </div>
  );
};

export default TamTruComponent;
