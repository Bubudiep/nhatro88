import React, { useState } from "react";

const ChuyenRaComponent = ({ onClose }) => {
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
          <div className="title2">Chuyển ra và thanh toán</div>
          <div className="body-container">
            <div className="h3">
              <div className="name">Danh sách xin ra</div>
            </div>
            <div className="list-group">
              <div className="null">
                <div className="logo"></div>
                <div className="message">Danh sách trống</div>
              </div>
            </div>
            <div className="h3">Danh sách người ở</div>
            <div className="list-group">
              <div className="null">
                <div className="logo"></div>
                <div className="message">Danh sách trống</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChuyenRaComponent;
