import React, { useState } from "react";

const ListNhatro = ({ option, onClose, user, onUserUpdate }) => {
  console.log(user); // In ra thông tin người dùng

  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose(); // Gọi onClose mà không cần truyền tham số alert
    }, 300); // Thời gian trễ phải tương ứng với thời gian của animation
  };

  // Ví dụ hàm để cập nhật thông tin người dùng
  const handleUpdateUser = (newUserData) => {
    if (onUserUpdate) {
      onUserUpdate(newUserData); // Gọi hàm callback để cập nhật người dùng
    }
  };

  return (
    <div className={`bottom-box-white-bg ${isClosing ? "hide-out" : ""}`}>
      <div className="detectOut" onClick={handleClose} />
      <div className={`bottom-box-white ${isClosing ? "hide-down" : ""}`}>
        <div className="top-bar">
          <div className="bar"></div>
        </div>
        <div className="title">Danh sách nhà trọ</div>
        <div className="body-container">
          <div className="list_item_big">
            {user?.nhatro.map((item) => (
              <div key={item.id} className="nhatro-item">
                <div className="logo">
                  <div className="img">LOGO</div>
                </div>
                <div className={`details ${item.isActive ? "active" : "stop"}`}>
                  <div className="i-info">
                    <div className="name i-title">{item.tenTro}</div>
                    <div className="value">
                      {item.isActive ? (
                        <div className="status active">Hoạt động</div>
                      ) : (
                        <div className="status stop">Tạm dừng</div>
                      )}
                    </div>
                  </div>
                  <div className="i-info">
                    <div className="name">Phòng</div>
                    <div className="value">
                      <div className="bold">00</div> đang ở /{" "}
                      <div className="bold">00</div> phòng
                    </div>
                  </div>
                  <div className="i-info">
                    <div className="name">Địa chỉ</div>
                    <div className="value">
                      <div className="null">Chưa có</div>
                    </div>
                  </div>
                </div>
                <div className="view">
                  <i className="fa-solid fa-chevron-right"></i>
                </div>
              </div>
            ))}
          </div>
          <div className="add">
            <div className="add-box">
              <div className="icon">
                <i className="fa-solid fa-plus"></i>
              </div>
              <div className="text">Thêm nhà trọ</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListNhatro;
