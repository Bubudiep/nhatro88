import React from "react";
import { Link } from "react-router-dom";

// Component PPopup để hiển thị các thông báo
const PPopup = ({
  id,
  type,
  iconClass,
  title,
  valueLinks,
  onClick,
  className,
}) => {
  return (
    <div className={`ppopup ${type} ${className}`} onClick={() => onClick(id)}>
      <div className="logo">
        <i className={iconClass}></i>
      </div>
      <div className="message">
        <div className="title">{title}</div>
        <div className="value">
          {valueLinks.map((item, index) => (
            <span key={index}>
              {item.link ? <Link to={item.link}>{item.text}</Link> : item.text}
              {index < valueLinks.length - 1 && " "}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PPopup;
