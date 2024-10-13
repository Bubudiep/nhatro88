import React, { useState } from "react";
import PPopup from "../tools/popup/P_popup";
import PChitiet from "../tools/popup/P_chitiet";

const AlertBox = ({ alerts, handleAlert }) => {
  const [fadeOutAlerts, setFadeOutAlerts] = useState([]);
  const [className, setClassname] = useState("");

  const handleAlertClick = (alert) => {
    // Thêm alert vào danh sách fadeOutAlerts để thực hiện hiệu ứng
    setClassname("fade-out");
    setFadeOutAlerts((prev) => [...prev, alert.id]);

    // Gọi hàm handleAlert để xử lý thông báo
    handleAlert(alert);

    // Xử lý delay cho việc xóa alert khỏi danh sách sau khi fade-out
    setTimeout(() => {
      setClassname("none");
    }, 500); // Thời gian trùng khớp với thời gian animation
  };

  return (
    <div className="alert-box">
      {alerts.map(
        (alert, index) =>
          !alert.readed && (
            <PPopup
              key={index}
              id={alert.id}
              type={alert.type}
              iconClass={alert.iconClass}
              title={alert.title}
              valueLinks={alert.valueLinks}
              onClick={() => handleAlertClick(alert)} // Truyền hàm xử lý khi bấm vào
              className={fadeOutAlerts.includes(alert.id) ? className : ""} // Áp dụng class fade-out nếu alert trong danh sách
            />
          )
      )}
    </div>
  );
};

export default AlertBox;
