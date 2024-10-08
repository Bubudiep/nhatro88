// Nhatromoi.js
import React, { useState } from "react";
import house_mini from "../../../img/house_mini.png";
import api from "../../../components/api"; // Import API

const Nhatromoi = ({ user, updateNhatro }) => {
  // Nhận callback updateNhatro từ Home
  const [tenNhatro, setTenNhatro] = useState("Nhà trọ A");

  const handleSubmit = () => {
    const data = {
      tenTro: tenNhatro,
    };

    api
      .post("/nhatro/", data, user.app.access_token)
      .then((response) => {
        console.log("Nhà trọ đã được tạo:", response.data);
        updateNhatro(); // Gọi callback để cập nhật lại dữ liệu nhà trọ
      })
      .catch((error) => {
        console.error("Lỗi khi tạo nhà trọ:", error);
      });
  };

  return (
    <div className="body-container">
      <div className="main-view-container">
        <div className="black-bar">
          <div className="bar"></div>
        </div>
        <div className="message-box">
          <div className="logo">
            <img src={house_mini} alt="House mini" />
          </div>
          <div className="hintbox">
            <div className="light">Nhà trọ 88</div> là một phần mềm được phát
            triển bởi <div className="light">HMH Group</div> nhằm mang lại lợi
            ích thiết thực trong việc quán lý, cho thuê nhà ở
          </div>
          <div className="logo">Lợi ích mang lại?</div>
          <div className="message">
            <ul>
              <li>1. Dễ dàng quản lý số phòng đang cho thuê và phòng trống</li>
              <li>2. Báo cáo lợi nhuận hàng tháng và dự kiến</li>
              <li>3. Tạo hóa đơn và yêu cầu gia hạn</li>
              <li>4. Dễ dàng kiểm soát ngày bắt đầu đến ở và trả phòng</li>
              <li>5. Quản lý thu chi hiệu quả</li>
              <li>6. Tạo thông báo, nội quy chung để cư dân dễ dàng nắm bắt</li>
              <li>7. Công khai và minh bạch</li>
            </ul>
          </div>
        </div>
        <div className="logo">Bắt đầu bằng tên một nhà trọ</div>
        <div className="tools-container">
          <div className="options main">
            <input
              type="text"
              value={tenNhatro}
              onChange={(e) => setTenNhatro(e.target.value)}
            />
          </div>
        </div>
        <div className="tools-container">
          <div className="options main">
            <button className="add" onClick={handleSubmit}>
              Bắt đầu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nhatromoi;
