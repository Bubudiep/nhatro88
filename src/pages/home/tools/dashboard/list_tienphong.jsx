import React, { useState } from "react";

const ListTienphong = ({ option, onClose, user, onUserUpdate }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [slideMain, setSlideMain] = useState("");
  const [slide2, setSlide2] = useState("");
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };
  console.log(option);
  return (
    <div className={`bottom-box-white-bg ${isClosing ? "hide-out" : ""}`}>
      <div className="detectOut" onClick={handleClose} />
      <div className={`bottom-box-white ${isClosing ? "hide-down" : ""}`}>
        <div className="top-bar">
          <div className="bar"></div>
        </div>
        <div
          className={`slider flex-1 message-box fade-in-5 gap-2 flex flex-col ${slide2}`}
        >
          <div className="title2">Doanh thu tạm tính</div>
          <div className="chitiet-phongtro"></div>
        </div>
      </div>
    </div>
  );
};

export default ListTienphong;
