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
            ích thiết thực trong việc quản lý và cho thuê nhà ở.
          </div>
          <div className="logo">Lợi ích mang lại?</div>
          <div className="message">
            <ul>
              <li>1. Tính công khai và minh bạch</li>
              <li>2. Tối ưu hóa quy trình quản lý nhà trọ</li>
              <li>3. Báo cáo và dự kiến lợi nhuận hàng tháng</li>
              <li>4. Kiểm soát ra vào thông minh</li>
              <li>5. Quản lý thu chi thông minh, hiệu quả</li>
              <li>....</li>
            </ul>
          </div>
        </div>
        <div className="text-[18px] font-medium">
          Bắt đầu bằng tên một nhà trọ
        </div>
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
            <button className="add text-[18px]" onClick={handleSubmit}>
              Bắt đầu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nhatromoi;
