import React, { useState } from "react";
import { Link } from "react-router-dom";

// Component PChitiet để hiển thị chi tiết thông báo
const PChitiet = ({ alert, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose(alert);
    }, 300); // Thời gian trễ phải tương ứng với thời gian của animation
  };
  if (!alert) {
    return <div>Thông báo không tồn tại!</div>;
  }
  return (
    <div className={`bottom-box-white-bg  ${isClosing ? "hide-out" : ""}`}>
      <div className="detectOut" onClick={handleClose} />
      <div className={`bottom-box-white  ${isClosing ? "hide-down" : ""}`}>
        <div className="top-bar">
          <div className="bar"></div>
        </div>
        <div className="title">{alert?.title}</div>
        <div className="body-container">
          <div className="massenger">
            {alert?.valueLinks.map((item, index) => (
              <span key={index}>
                {item.link ? (
                  <Link to={item.link}>{item.text}</Link>
                ) : (
                  item.text
                )}
                {index < alert?.valueLinks.length - 1 && " "}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PChitiet;
